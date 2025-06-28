import { phases } from '../data/fypKnowledgeBase.js';
import Idea from '../models/idea.model.js';
import axios from 'axios';
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { extractTextFromPDF } = require('../utils/pdfParser.cjs');
import path from 'path';

import { getEmbedding, chatWithGemini } from '../utils/gemini.js';
import { getSessionHistory, addToSession } from '../utils/sessionMemory.js';
import { getLastUploadedFileByUser } from '../services/chatBotUpload.service.js';

export const askAndCheckIdea = async (req, res) => {
  try {
    const { message, userId } = req.body;
    const lowerMsg = message.toLowerCase();
    const cleanedMsg = message.trim();

    if (!userId) return res.status(400).json({ reply: '⚠️ Missing user ID. Please login again.' });

    // Save user message to memory
    addToSession(userId, { role: 'user', content: message });

    // 📘 Help resources
    const helpKeywords = ['guideline', 'material', 'official', 'resource', 'help', 'how to start', 'fyp steps', 'procedure'];
    if (helpKeywords.some(k => lowerMsg.includes(k))) {
      return res.json({
        reply: '📘 You can find official FYP guidelines and materials here:',
        templateUrl: 'http://smrms.ucp.edu.pk',
      });
    }

    // 📌 List of FYP phases
    if (lowerMsg.includes('fyp') && lowerMsg.includes('phases')) {
      const list = phases.map((p, i) => `🔹 ${i + 1}. ${p.name}`).join('\n');
      return res.json({ reply: `📌 The FYP process includes:\n\n${list}` });
    }

    // 📄 Phase template
    const foundPhase = phases.find(p => lowerMsg.includes(p.name.toLowerCase()));
    if (foundPhase && lowerMsg.includes('template')) {
      return res.json({
        reply: `📄 Template for **${foundPhase.name}** phase:`,
        templateUrl: foundPhase.template,
      });
    }

    // 📤 Extract and summarize uploaded PDF
   if (lowerMsg.includes('extract') && lowerMsg.includes('file')) {
  const fileRecord = await getLastUploadedFileByUser(userId);
  if (!fileRecord) {
    return res.json({ reply: '❌ No uploaded file found for you. Please upload a file first.' });
  }

  if (!fs.existsSync(fileRecord.filePath)) {
    return res.json({ reply: '❌ File not found on the server. Please upload it again.' });
  }

  const pdfText = await extractTextFromPDF(fileRecord.filePath);

  const summary = await chatWithGemini(
    `Extract and summarize this uploaded FYP file:\n${pdfText.substring(0, 3000)}`
  );

  return res.json({
    reply: `📄 Here's a summary of your uploaded file:\n\n${summary}`,
    file: fileRecord.originalName,
  });
}
    // 💡 Idea title reuse check
    let titleMatch = cleanedMsg.match(/title\s*(?:is|=|:)?\s*["“”']?(.+?)["“”']?\s*(used before)?\??$/i);
    let extractedTitle = titleMatch ? titleMatch[1] : null;

    if (!extractedTitle && lowerMsg.includes('idea') && lowerMsg.includes('title')) {
      const altMatch = cleanedMsg.match(/(?:idea.*title.*)?["“”']?(.+?platform.*?)["“”']?/i);
      if (altMatch) extractedTitle = altMatch[1];
    }

    if (extractedTitle) {
      const matchingIdeas = await Idea.find({
        title: { $regex: new RegExp(`^${extractedTitle.trim()}$`, 'i') },
      });

      if (matchingIdeas.length > 0) {
        const allMatched = matchingIdeas.map((idea) => `✅ Used by ${idea.submittedBy} in ${idea.year}`).join('\n');

        const suggestion = await chatWithGemini(
          `The idea titled "${extractedTitle}" already exists. Suggest improvements or ways to make it more unique.`
        );

        return res.json({
          reply: `⚠️ This idea has already been submitted:\n\n${allMatched}`,
          suggestion,
          matches: matchingIdeas,
        });
      }

      // Semantic similarity check
      const embedding = await getEmbedding(extractedTitle);
      const chromaRes = await axios.post('http://localhost:8001/query', { embedding });
      const similar = chromaRes.data.documents?.[0]?.[0];
      const distance = chromaRes.data.distances?.[0]?.[0];

      if (similar && distance < 0.5) {
        const suggestion = await chatWithGemini(
          `The idea "${extractedTitle}" is very similar to an existing one. Suggest improvements.`
        );
        return res.json({
          reply: `⚠️ This idea is **very similar** to an existing one.`,
          similarityScore: distance,
          suggestion,
          similarIdea: similar,
        });
      }

      return res.json({ reply: `✅ This idea appears to be **new**. You can proceed with it.` });
    }

    // 🧠 General fallback with session memory
    const history = getSessionHistory(userId);
    const fullPrompt = history.map(m => `${m.role === 'user' ? 'User' : 'Bot'}: ${m.content}`).join('\n') + `\nUser: ${message}`;

    const response = await chatWithGemini(
      `You are an FYP Advisor. Maintain continuity and answer based on past questions if possible.\n${fullPrompt}`
    );

    addToSession(userId, { role: 'bot', content: response });

    return res.json({ reply: response });

  } catch (error) {
    console.error('❌ Error in askAndCheckIdea:', error.message);
    return res.status(500).json({ reply: '❌ Internal server error. Please try again later.' });
  }
};
