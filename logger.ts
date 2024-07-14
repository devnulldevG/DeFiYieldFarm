import winston from 'winston';
import dotenv from 'dotenv';
dotenv.config();

const { LOG_LEVEL = 'info', LOG_FILE = 'application.log' } = process.env;

const logger = winston.createLogger({
  level: LOG_LEVEL,
  transports: [
    new winston.transports.File({ filename: LOG_FILE }),
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
});

function logMemoryUsage(): void {
  const used = process.memoryUsage();
  const messages = [];
  for (let key in used) {
    messages.push(`${key}: ${Math.round((used[key as keyof NodeJS.MemoryUsage] / 1024 / 1024) * 100) / 100} MB`);
  }
  logger.info(`Memory Usage: ${messages.join(', ')}`);
}

setInterval(logSSMemoryUsage, 300000);

logger.info('DeFiYieldFarm application started.');

export { logger };