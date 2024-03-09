import { NextFunction, Request, Response } from "express";
import logger from "../../utils/logger";


const requestLogger = (request:Request, _response:Response,next:NextFunction) => {
  
  logger.info('---')
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')

  next()
}

const unknownEndpoint = (_request:Request, response:Response) => {
  return response.status(404).send({ error: 'Unknown Endpoint' })
}

const errorHandler = (error:Error, _request:Request, response:Response,next:NextFunction) => {
  

  logger.error("Reached Final Error Handler : ",
  "error name:",error.name,
  "error message",error.message)
  
  switch (error.name) {
    case 'JsonWebTokenError':
      return response.status(401).send({error:'invalid token'})
    case 'AuthTokenNotProvidedError':
      return response.status(401).json({error:"Auth Token Not Provided"})
    case 'CastError':
      return response.status(400).send({error: 'malformatted id' })
    case 'CreatePostValidationError':
       return response.status(400).json({error: error.message })
    case 'ValidationError':
       return response.status(400).json({error: error.message })
    case 'UnauthorizedUserError':
         return response.status(404).json({error: error.message })
    case 'PostNotFoundError':
         return response.status(404).json({error: error.message })
    case 'CommentNotFoundError':
         return response.status(404).json({error: error.message })
    case 'Error':
      return response.status(400).json({ type:"YET_TO_DEFINE_ERROR",error_name:error.name , error_message:error.message})
    default:
      console.error(" No even an Error ? This is yet to define and find !! ")
  }
   
  next(error)
}

export default{
unknownEndpoint,
errorHandler,
requestLogger
}