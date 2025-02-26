import mongoose from "mongoose";

 // creating Schema 
const emailSchema = new mongoose.Schema({
    
    recipientEmail: {type: String, required: true },
    emailSubject: {type: String, required: true } ,
    generatedEmailBody: {type: String, required: true } ,


 })
    
   // using the above user schema create emailModel
 const emailModel = mongoose.models.EmailData || mongoose.model("EmailData" , emailSchema) ; 

 export default emailModel ;