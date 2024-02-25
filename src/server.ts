import cors from 'cors'
import express from 'express'
const server = express()

//middleware
server.use(express.json())
server.use(cors())

export default server
