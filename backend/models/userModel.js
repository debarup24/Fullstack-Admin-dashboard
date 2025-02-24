import mongoose from "mongoose";

 // creating Schema 
const userSchema = new mongoose.Schema({
    // in this define the structure of the user data - name, email, password .. 
    
    name: {type: String, required: true } ,
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true } ,
    verifyOtp: {type: String, default: "" } ,
    verifyOtpExpireAt: {type: Number, default: 0 } ,
    isAccountVerified: {type: Boolean, default: false } ,
    resetOtp: {type: String, default: "" } ,
    resetOtpExpireAt: {type: Number, default: 0 } ,

 })
    
   // using the above user schema create userModel
 const userModel = mongoose.models.users || mongoose.model("users" , userSchema) ; 

 export default userModel ;