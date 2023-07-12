import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: (_, callback) => {
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  credentials: true
};
