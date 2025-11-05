const express = require("express");

const index = express(); 

const connectDB = require ('./src/config/db.config')

// Connect to Database
connectDB(process.env.MONGO_URI);
const logger = require('./src/middleware/logger');
const authRoute = require ('./src/routes/authRoutes')
const registrationRoute = require('./src/routes/registrationRoute')
const userRoutes = require ('./src/routes/userRoutes');
const errorHandler = require("./src/middleware/errorHandler");

// Middleware  - setting Headers ,  Routers , logger, ,  Error Handlers ,

// body parsing 
app.use(express.json())

//setting headers 
// app.use((req,res,next)=>{
//     res.setHeaders("content-security-policy": "<security policy, cdn , trusted source... ")
// })

//logger 

app.use(logger)
// Routers 

// Public Route 
app.use('/login', authRoute)

app.use('/registration', registrationRoute)

// Protected Routes 

app.use('/api/user', userRoutes)

app.use(errorHandler)

module.exports = index; 
