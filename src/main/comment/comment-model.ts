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
    }
},{
  timestamps:true
});

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.password
  }
})


export default model('Comment', commentSchema);