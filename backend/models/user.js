import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    name:{
        type:String,
        require:true,
        
    },
    password:{
        type:String,
        require:true,
        
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationCode:String
},{timestamps:true})

const Usermodel = mongoose.model("user",userSchema)

export default Usermodel