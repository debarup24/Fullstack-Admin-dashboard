import express from "express" ;
import cors from "cors" ;
import "dotenv/config" ;
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import emailRouter from "./routes/emailRoutes.js";
import path from "path";

const app = express() ;
connectDB() ;

const port = process.env.PORT || 4001 

const _dirname = path.resolve() 


app.use(express.json()) ;  // all the req will be passed through JSON
app.use (cookieParser()) ;

const allowedOrigins =  ["http://localhost:5173" , "https://auth-mern-client-delta.vercel.app"]

app.use(cors({origin: allowedOrigins , credentials: true}))


app.use("/api/auth", authRouter) ;
app.use("/api/user", userRouter) ;
app.use("/api/email", emailRouter) ;

app.use(express.static(path.join(_dirname , "/frontend/dist")))
app.get('*' , (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend" , "dist", "index.html"))
})

app.listen(port, () => console.log(`Server sucessfully started on PORT : ${port}`)) ;