import { Schema, model } from 'mongoose';


const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId:{
      type:Schema.Types.ObjectId,
      ref:'User',
      required:true
    }
},{
  timestamps:true
});

commentSchema.set('toJSON', {
  transform: (document:any, returnedObject:any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


export default model('Comment', commentSchema);