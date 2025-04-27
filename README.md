# MidJourney-Style Image Generator API

## Author: Eren

## How to Deploy (Render.com)
1. Upload this folder to a GitHub repository.
2. Go to [Render](https://render.com/).
3. Create a New Web Service -> Connect your GitHub Repo.
4. Set Environment Variable:
   - `HF_API_TOKEN = your_huggingface_api_key`
5. Done! Your API will be live.

## Endpoints
- `POST /generate` -> { "prompt": "your description" }

## Usage
You can use this API to generate MidJourney-style images by sending a POST request to `/generate` with a `prompt` in the request body. The image will be returned as a base64 encoded PNG.

## License
This project is licensed under the ISC License.
