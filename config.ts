import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
  port: number;
  dbUri: string;
  apiKey: string;
  secretKey: string;
}

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
}

function createConfig(): AppConfig {
  return {
    port: parseInt(getEnvArrange('PORT'), 10),
    dbUri: getEnvVariable('DB_URI'),
    apiKey: getEnvVariable('API_KEY'),
    secretKey: getEnvVariable('SECRET_KEY'),
  };
}

function getEnvArrange(key: string): string {
  const value = getEnvVariable(key);
  if (key === 'PORT' && isNaN(parseInt(value, 10))) {
    throw new Error(`PORT must be a number but received '${value}'`);
  }
  return value;
}

const config: AppConfig = createConfig();

export default config;