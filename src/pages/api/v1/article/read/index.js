import axios from 'axios';
import NextCors from 'nextjs-cors';

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const baseUrl = 'http://172.16.20.136:3000/api/v1/platform/laju-peduli/products';
  const jwt = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwOGU2ZTNmNzg4ZDYwMTk0MDA1ZGJiYzE5NDc0YmY5Mjg5ZDM5ZWEiLCJ0eXAiOiJKV1QifQ...';

  const requestData = req.body; // The data sent in the POST request body

  try {
    const response = await axios.post(baseUrl, requestData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Request failed:', error);
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data.message : 'Internal Server Error';

    res.status(status).json({ message, details: error.message });
  }
}
