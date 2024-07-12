import winston from 'winston';
import dotenv from 'dotenv';
dotenv.config();
const { LOG_LEVEL = 'info', LOG_FILE = 'application.log' } = process.env;
const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),