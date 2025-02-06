/* eslint-disable no-undef */
import axios from 'axios';

export const TypesenseRestApi = async ({ collection, ...params }) => {
  const API = process.env.NEXT_PUBLIC_TYPESENSE_API_KEY;
  const url = process.env.NEXT_PUBLIC_TYPESENSE_HOST;

  const dataRes = await axios.get(`https://${url}:443/collections/${collection}/documents/search`, {
    params: {
      ...params,
    },
    headers: {
      'X-TYPESENSE-API-KEY': API,
    },
  });

  return dataRes.data;
};

// export const clientTypessense = new Typesense.Client({
//   nodes: [
//     {
//       host: process.env.NEXT_PUBLIC_TYPESENSE_HOST, // For Typesense Cloud use xxx.a1.typesense.net
//       port: '443', // For Typesense Cloud use 443
//       protocol: 'https', // For Typesense Cloud use https
//     },
//   ],
//   apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY,
//   connectionTimeoutSeconds: 15,
// });
