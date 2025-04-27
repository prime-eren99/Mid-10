require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON in requests
app.use(express.json());

// Endpoint to handle image generation requests
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  // Check if the prompt is provided
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Sending request to Hugging Face API for image generation
    const response = await axios.post('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2', {
      inputs: prompt
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.HF_API_TOKEN}`, // Get the token from .env
      }
    });

    // Return the generated image
    if (response.data && response.data[0]?.generated_image) {
      return res.json({ image: response.data[0].generated_image });
    } else {
      return res.status(500).json({ error: 'Failed to generate image' });
    }
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
