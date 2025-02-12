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

  // const baseUrl = 'https://deoapp.com/api/public/platform/laju-peduli/blog';
  const baseUrl = 'https://deoapp.com/api/public/platform/laju-peduli/blog-sub';

  const requestData = req.body;

  try {
    const response = await axios.post(baseUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Request failed:', error);
    const status = error.response ? error.response.status : 500;
    const message = error.response
      ? error.response.data.message
      : 'Internal Server Error';

    return res.status(status).json({ message, details: error.message });
  }
}
