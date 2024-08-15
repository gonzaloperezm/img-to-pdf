import cors from 'cors';

export const corsMiddelware = () => cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:4321',
      'http://localhost:1234',
      'http://localhost:5173',
      'https://img-to-pdf-j9ul.onrender.com'
    ];

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
