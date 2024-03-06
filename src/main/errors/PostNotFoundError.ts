export class PostNotFoundError extends Error{
   
    constructor(){
      super("Post Does Not Exist")

      this.name='PostNotFoundError'
    }
}