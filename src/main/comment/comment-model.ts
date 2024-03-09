import mongoose, { Document, Model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface IComment extends Document {
  postId: mongoose.Types.ObjectId;
  content: string;
  userId: mongoose.Types.ObjectId;
}

interface ICommentModel extends Model<IComment> {
  paginate: (query: any, options: any) => Promise<any>;
}

const commentSchema = new Schema<IComment>({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

commentSchema.plugin(mongoosePaginate);

commentSchema.set('toJSON', {
  transform: (document:any, returnedObject:any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

  }
})


const CommentModel = mongoose.model<IComment, ICommentModel>('Comment', commentSchema);

export default CommentModel;