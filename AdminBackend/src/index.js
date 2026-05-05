const express = require("express");
const dotenv=require("dotenv").config();
const dbConnect=require("./config/dbConnect");
const authRoutes=require("./routes/authRouter");
const userRoutes=require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const adminRoutes = require("./routes/adminRoutes");


const cors = require("cors");
dbConnect();

const app=express();

app.use(cors());
app.use(express.json());


app.use("/api/appointment", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes)

const PORT=process.env.PORT || 7002;
app.listen(PORT,()=>{
    console.log(`Server is Runnning at ${PORT}`)
})