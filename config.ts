import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
  port: number;
  dbUri: string;
  apiKey: string;
  secretKey: string;
}

const config: AppConfig = {
  port: parseInt(process.env.PORT as string, 10),
  dbUri: process.env.DB_URI as string,
  apiKey: process.env.API_KEY as string,
  secretKey: process.env.SECRET_KEY as string,
};

export default config;