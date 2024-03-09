export class CreatePostValidationError extends Error{
  
  constructor(message:any){
  
    super(message)

    this.name='CreatePostValidationError'

  }
  
}