import { Schema, model } from 'mongoose';


const commentSchema = new Schema({
    id: {
        type: String,
        required: false
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Comment = model('Comment', commentSchema);

export default Comment;