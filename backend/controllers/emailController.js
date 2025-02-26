import emailModel from "../models/emailModel.js"; 
import transporter from "../config/nodemailer.js";


export const sendEmail = async (req, res) => {
    const {recipientEmail , emailSubject, generatedEmailBody} = req.body ;

    if(!recipientEmail || !emailSubject || !generatedEmailBody ) {
       return res.json({success: false, message: "Can't send! Details Missing!"})
    } 
     try {

        const aiMail = new emailModel({recipientEmail , emailSubject, generatedEmailBody}) ;
        await aiMail.save() ; // save data in database 

         
       // Sending welcome Email : 
       const mailOptions = {
         from: process.env.SENDER_EMAIL ,
         to: recipientEmail, // from req.body 
         subject: `${emailSubject}`,
         text: `${generatedEmailBody},
         

         **DISCLAIMER : This is a testing email for educational purpose! Please DON'T share any personal details if asked! Sender is not responsible for any harm!
         
         Project : Full stack Admin-Dashboard
         Check Project : https://fullstack-admin-dashboard-2v9g.onrender.com/
          
         
         ` 
       }

       await transporter.sendMail(mailOptions) ;

       return res.json({success: true , message: "Email delivered"  }) ; 

     } catch (error) {
       return res.json({success: false, message: error.message})
     }
}
