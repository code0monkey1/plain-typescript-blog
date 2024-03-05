export class CreatePostValidationError extends Error{
  
  constructor(message?:any){
  
    super(message?message:"The data to create a new post is invalid")

    this.name='CreatePostValidationError'

  }
  
}