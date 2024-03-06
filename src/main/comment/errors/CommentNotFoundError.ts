export class CommentNotFoundError extends Error{
   
    constructor(){
      super("Comment Does Not Exist")

      this.name='CommentNotFoundError'
    }
}