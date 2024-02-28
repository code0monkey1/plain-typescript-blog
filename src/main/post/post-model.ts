const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
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



export default  mongoose.model('Post', postSchema);