
import mongoose, { model } from 'mongoose';



const schema = mongoose.Schema;


const userSchema = new schema({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
   
    
})


const userModel = model ('user',userSchema);
export default userModel;