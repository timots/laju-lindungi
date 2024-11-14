import axios from 'axios';
import NextCors from 'nextjs-cors';

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  // Configure CORS for API
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  // Ensure the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Define the base URL and JWT token
  const baseUrl = 'http://172.16.20.136:3000/api/v1/platform/laju-peduli/orders';
  const jwt = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwOGU2ZTNmNzg4ZDYwMTk0MDA1ZGJiYzE5NDc0YmY5Mjg5ZDM5ZWEiLCJ0eXAiOiJKV1QifQ...';

  // Extract the request data from the body
  const requestData = req.body;

  try {
    // Make the API request
    const response = await axios.post(baseUrl, requestData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });

    // Send successful response with data
    res.status(200).json(response.data);
  } catch (error) {
  
    console.error('Request failed:', error);
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data.message : 'Internal Server Error';

    // Send error response with status and message
    res.status(status).json({ message, details: error.message });
  }
}
