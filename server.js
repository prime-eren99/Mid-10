const express = require('express');
const axios = require('axios'); // Used for making requests to the Hugging Face API
const app = express();
const port = process.env.PORT || 3000;

// Make sure to add express.json() to parse JSON in the request body
app.use(express.json());

// Image generation endpoint
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Sending the prompt to Hugging Face's model for image generation
    const response = await axios.post('https://api-inference.huggingface.co/models/YOUR_MODEL_NAME', 
    {
      inputs: prompt
    },
    {
      headers: {
        'Authorization': `Bearer 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`, // Use your API token here
      }
    });

    // Check if response contains the generated image
    if (response.data && response.data[0]?.generated_image) {
      return res.json({ image: response.data[0].generated_image }); // Assuming the API returns base64 image
    } else {
      return res.status(500).json({ error: 'Failed to generate image' });
    }
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
