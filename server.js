/**
 * MidJourney Style Image Generator API
 * Author: Eren
 */

const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const HF_API_TOKEN = process.env.HF_API_TOKEN; // Set in Render environment
const MODEL_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0';

app.get('/', (req, res) => {
  res.send('MidJourney-Style Image Generator API is Running!');
});

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  try {
    const response = await axios.post(MODEL_URL,
      { inputs: prompt },
      {
        headers: { Authorization: `Bearer ${HF_API_TOKEN}` },
        responseType: 'arraybuffer'
      }
    );

    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    res.json({ image: `data:image/png;base64,${base64Image}` });
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
