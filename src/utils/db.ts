import * as dotenv from 'dotenv';
import { EventEmitter } from 'events';
import mongoose, { ConnectOptions } from 'mongoose';
import logger from './logger';
dotenv.config();

const eventEmitter = new EventEmitter();

class Database {
  static async connect(url:string) {

    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);

      logger.info('✅ Connected to DB');

      // Health check
      setInterval(() => {
        if (!mongoose.connection.readyState) {
          logger.error('DB connection error');
          eventEmitter.emit('dbConnectionError');
        }
      }, 10000);
    } catch (error) {
      if(error instanceof Error)
      logger.error('❌ Not connected with database:', error.message);
      eventEmitter.emit('dbConnectionError');
    }
  }

  static async disconnect() {
    await mongoose.connection.close();
  }
}

function shutdown() {
  logger.error('❗️❗️ Shutting down server due to DB connection error');
  process.exit(0);
}

eventEmitter.on('dbConnectionError', () => {
  logger.info('DB connection error');
  shutdown();
});

process.on('SIGINT', () => {
  logger.error('Received SIGINT signal, shutting down gracefully');
  Database.disconnect().then(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  logger.error('Received SIGTERM signal, shutting down gracefully');
  Database.disconnect().then(() => {
    process.exit(0);
  });
});

export default Database;