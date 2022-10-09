import express from 'express'
import connectDB from './config/db.js';
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import admin from './router/admin.js'
import manager from './router/manager.js'
import user from './router/user.js'
    
const PORT = process.env.PORT || 5000
const app = express()
app.use(cors({origin: true, credentials: true}));
// app.use(cookieParser())
dotenv.config();
connectDB();

app.use(express.json()); // to accept json data

// app.use(cors({
//     origin: ["192.168.100.53", "http://localhost:19000", "http://localhost:5000"],
//     credentials: true
// }))

// app.use('/api/v1', auth)
app.use('/api/v1/admin',admin)
app.use('/api/v1/manager',manager)
app.use('/api/v1/user',user)




app.listen(PORT, function () {
    console.log("server is running on", PORT);
})