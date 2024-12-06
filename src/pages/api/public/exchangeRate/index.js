import axios from 'axios';
import NextCors from 'nextjs-cors';

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ['GET'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const baseUrl = 'https://deoapp.com/api/public/service/rates/currency';

  try {
    const response = await axios.get(baseUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(response.data.data.rates);
  } catch (error) {
    console.error('Request failed:', error);
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data.message : 'Internal Server Error';

    res.status(status).json({ message, details: error.message });
  }
}
