
import posts from './routers/post-routes';
import server from "./server";

server.use('/api/v1/',posts)

const PORT = 3001

server.listen(PORT,()=>{
   console.log("The express server is listening to port",PORT)
})     


