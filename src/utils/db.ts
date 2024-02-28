import * as dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
const { EventEmitter } = require('events');
dotenv.config();

// Create an event emitter instance
const eventEmitter = new EventEmitter();

export default class Database {
  private static _database: Database;

  private constructor() {
    const DB_URL = "mongodb+srv://vonnwatson:watson1985@mycanadianmentor.l7vqx.mongodb.net/simple-blog?authSource=admin&replicaSet=atlas-ocbp6d-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

    if (DB_URL) {
      console.log("starting to connect to db")
      mongoose
        .connect(DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as ConnectOptions)
        .then(() =>
        {
          console.log('✅ Connected to DB')

          // Health check
          setInterval(() => {
            // Perform a test query or check the connection status
            if (!mongoose.connection.readyState) {
              console.error('DB connection error');
              eventEmitter.emit('dbConnectionError');
            }
          }, 5000);

        })
        .catch((error) =>{
          let errorMessage ;

          if (error instanceof Error){
            errorMessage=error.message
          }
          console.error('❌ Not connected with database : ',errorMessage)
          process.exit(0);
        }
         );
    }
  }
  static connect() {
    if (this._database) {
      console.log("returning running database")
      return this._database;
    }
    console.log("creating new database and returning it ")
    this._database = new Database();
    return (this._database = new Database());
  }
}


// Graceful shutdown
// Graceful shutdown
function shutdown() {
  console.log('❗️❗️Shutting down server due to DB connection error');
    process.exit(0);

}

// Catch the event and initiate shutdown
// Catch the event and initiate shutdown
eventEmitter.on('dbConnectionError', () => {
  shutdown()
});

// Handle shutdown signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);