import axios from 'axios';
import Idea from '../models/idea.model.js';
import { getEmbedding } from '../utils/gemini.js';

export const submitIdea = async (req, res) => {
  const { title, description, submittedBy, year } = req.body;

  const text = `${title} ${description}`;
  const embedding = await getEmbedding(text);
//   console.log('Embedding returned:', embedding); 

  if (!embedding) {
    return res.status(500).json({ message: 'Embedding failed.' });
  }

  const idea = new Idea({ title, description, submittedBy, year });
  await idea.save();

  // Store in vector DB
  await axios.post('http://localhost:8001/add', {
    id: idea._id.toString(),
    text,
    embedding,
  });

  res.json({ message: 'Idea submitted successfully.', idea });
};
