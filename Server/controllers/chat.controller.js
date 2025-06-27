import { chatWithGemini } from '../utils/gemini.js';

export const askChatbot = async (req, res) => {
  const { message } = req.body;

  const reply = await chatWithGemini(message);

  res.json({ reply });
};
