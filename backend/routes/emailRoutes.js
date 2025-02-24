import express from "express" ;

import { sendEmail } from "../controllers/emailController.js";

const emailRouter = express.Router() ;

emailRouter.post("/send-ai-email" , sendEmail) ;


export default emailRouter;