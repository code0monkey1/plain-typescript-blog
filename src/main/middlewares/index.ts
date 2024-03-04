import { NextFunction, Request, Response } from "express";


import logger from "../../utils/logger";

const requestLogger = (request:Request, response:Response,next:NextFunction) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')

  next()
}

const unknownEndpoint = (request:Request, response:Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error:Error, request:Request, response:Response,next:NextFunction) => {
  

  logger.error("Final Error Handler Reaches",error.message)

  if(error.name === 'MongooseError'){

    console.log('MongooseError reached')
    return response.status(401).send({error:error.message})
  }
  if(error.name==='AuthTokenNotProvidedError'){
    console.log('AuthTokenNotProvidedError reached')
    return response.status(401).send({error:error.message})
  }
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name==='JsonWebTokenError'){
    console.log("invalid json web token error handler reached ")
    return response.status(401).send({error:'invalid token'})
  }
 
  next()

}

export default{
unknownEndpoint,
errorHandler,
requestLogger
}