export class CreateCommentValidationError extends Error{
  
  constructor(message:string){
  
    super(message)

    this.name='CreateCommentValidationError'

  }
  
}