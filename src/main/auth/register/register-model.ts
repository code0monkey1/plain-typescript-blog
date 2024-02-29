import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const userSchema = new Schema({
    username: {
      type:String,
      unique:true,
      required:true,
      minlength:3
    },
    name: String,
    passwordHash: {
        type: String,
        required: true
    }
},{
  timestamps:true
});

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document:any, returnedObject:any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const UserModel = model('User',userSchema)


export default UserModel