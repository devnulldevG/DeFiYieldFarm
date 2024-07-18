import winston from 'winston';
import dotenv from 'dotenv';

try {
    dotenv.config();
    if (!process.env.LOG_LEVEL || !process.env.LOG_FILE) {
        console.error('Critical environmental variables are missing. Ensure LOG_LEVEL and LOG_FILE are set.');
        process.exit(1);
    }
} catch (error) {
    console.error(`Failed to load environment configuration: ${error}`);
    process.exit(1);
}

const { LOG_LEVEL = 'info', LOG_FILE = 'application.log' } = process.env;

let logger;

try {
    logger = winston.createLogger({
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
} catch (error) {
    console.error(`Failed to configure logger: ${error}`);
    logger = winston.createLogger({
        level: 'info',
        transports: [
            new winston.transports.Console(),
        ],
    });
    logger.error('Logging is not configured properly. Defaulting to console.');
}

function logMemoryUsage(): void {
    try {
        const used = process.memoryAsyncUsage();
        const messages = [];
        for (let key in used) {
            messages.push(`${key}: ${Math.round((used[key as keyof NodeJS.MemoryUsage] / 1024 / 1024) * 100) / 100} MB`);
        }
        logger.info(`Memory Usage: ${messages.join(', ')}`);
    } catch (error) {
        logger.error(`Failed to log memory usage: ${error}`);
    }
}

try {
    setInterval(logMemoryUsage, 300000);
} catch(error) {
    logger.error(`Failed to set interval for memory usage logging: ${error}`);
}

logger.info('DeFiYieldFarm application started.');

export { logger };