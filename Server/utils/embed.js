import axios from 'axios';

export const getEmbedding = async (text) => {
  try {
    const res = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedText',
      {
        model: 'models/embedding-001',
        text,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    return res.data.embedding.values;
  } catch (err) {
    console.error('Embedding failed:', err.response?.data || err);
    return null;
  }
};
