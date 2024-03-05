import { NextFunction, Request, Response } from "express";
import logger from "../../utils/logger";
const requestLogger = (request:Request, response:Response,next:NextFunction) => {
  
  logger.info('---')
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')

  next()
}

const unknownEndpoint = (request:Request, response:Response) => {
  return response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error:Error, request:Request, response:Response,next:NextFunction) => {
  

  logger.error("Reached Final Error Handler",
  "error name:",error.name,
  "error message",error.message)
  
  switch (error.name) {
    case 'CastError':
      return response.status(400).send({ error: 'malformatted id' })
    case 'ValidationError':
       return response.status(400).json({ error: error.message })
    case 'JsonWebTokenError':
      return response.status(401).send({error:'invalid token'})
    default:
      console.error("Error not found : ",error.name,error.message)
  }
   
  next(error)
}

export default{
unknownEndpoint,
errorHandler,
requestLogger
}