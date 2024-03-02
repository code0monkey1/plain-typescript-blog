const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    comments: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }],
        default: []
    },
    userId:{// inject user data using user ObjectId
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    }
},{
  timestamps:true
});


postSchema.set('toJSON', {
  transform: (document:any, returnedObject:any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.password
  }
})

const PostModel = mongoose.model('Post', postSchema);

export default  PostModel