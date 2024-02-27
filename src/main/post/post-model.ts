const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: {
        type: String,
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
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            unique: true
        }],
        default: []
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;