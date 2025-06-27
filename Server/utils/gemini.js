import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// 🔹 Generate Embedding using Gemini 1.5 Flash
export const getEmbedding = async (text) => {
  try {
    const res = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent',
      {
        content: {
          parts: [{ text }]
        }
      },
      {
        headers: { 'Content-Type': 'application/json' },
        params: { key: process.env.GEMINI_API_KEY },
      }
    );

    const embedding = res.data?.embedding?.values || res.data?.embeddings?.[0]?.values || null;
    console.log('Gemini embedding:', embedding);
    return embedding;
  } catch (err) {
    console.error('Gemini embedding error:', err.response?.data || err.message);
    return null;
  }
};


// 🔹 Generate a chatbot response using Gemini 1.5 Flash
export const chatWithGemini = async (prompt) => {
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      },
      {
        headers: { 'Content-Type': 'application/json' },
        params: { key: process.env.GEMINI_API_KEY },
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  } catch (error) {
    console.error('❌ Gemini chat error:', error.response?.data || error.message);
    return 'Something went wrong';
  }
};

