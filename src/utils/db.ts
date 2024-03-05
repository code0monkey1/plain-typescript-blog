import * as dotenv from 'dotenv';
import { EventEmitter } from 'events';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();

const eventEmitter = new EventEmitter();

class Database {
  static async connect(url:string) {

    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);

      console.log('✅ Connected to DB');

      // Health check
      setInterval(() => {
        if (!mongoose.connection.readyState) {
          console.error('DB connection error');
          eventEmitter.emit('dbConnectionError');
        }
      }, 10000);
    } catch (error) {
      if(error instanceof Error)
      console.error('❌ Not connected with database:', error.message);
      eventEmitter.emit('dbConnectionError');
    }
  }

  static async disconnect() {
    await mongoose.connection.close();
  }
}

function shutdown() {
  console.log('❗️❗️ Shutting down server due to DB connection error');
  process.exit(0);
}

eventEmitter.on('dbConnectionError', () => {
  console.log('DB connection error');
  shutdown();
});

process.on('SIGINT', () => {
  console.log('Received SIGINT signal, shutting down gracefully');
  Database.disconnect().then(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM signal, shutting down gracefully');
  Database.disconnect().then(() => {
    process.exit(0);
  });
});

export default Database;