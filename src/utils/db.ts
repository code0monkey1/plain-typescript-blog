import * as dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
const { EventEmitter } = require('events');
dotenv.config();

// Create an event emitter instance
const eventEmitter = new EventEmitter();

export default class Database {

  static connect() {

      mongoose
        .connect(process.env.MONGODB_URL!, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as ConnectOptions)
        .then(() =>
        {
          console.log('✅ Connected to DB')
          //Health check
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

          if (error instanceof Error)
            errorMessage=error.message
          
          console.error('❌ Not connected with database : ',errorMessage)
          process.exit(0);
        }
         );
  }

  static  disconnect(){
    mongoose.connection.close()
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
   
  console.log("Db connection error")

  shutdown()
});

// // Handle shutdown signals
// process.on('SIGINT', shutdown);
// process.on('SIGTERM', shutdown);