import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './config/dbConnect.js'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import doctorRoutes from './routes/doctor.routes.js'
import cloudianryConnect from './config/cloudinary.js'
dotenv.config()
const app=express();
app.use(cors({
  origin:[ 'http://localhost:5173' ,'http://localhost:5174'],// Update with your frontend URL
  credentials: true
}))
dbConnect();
cloudianryConnect();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('API is running...');
  });
app.use('/api/auth',authRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/doctor',doctorRoutes)
const PORT=process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})
