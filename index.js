
//HAPPY CODING  🤩🚀😃

//this is our main (index.js) file and we connent paths, mongoDB and .env here,
//from node.js to Routes folder then from Routes folder to 
//Controllers folder (which itself connected to its Schema (structure) folder).

require('dotenv').config()

const cors=require('cors')
const port = process.env.server_port
const express = require('express')

const mongoose = require('mongoose')
mongoose.connect(process.env.mongo_url)
console.log('Connected to MongoDB Database')

const app = express()
app.use(express.json())
app.use(cors())

//Routes

const adminRoute = require('./Router/admin')
const instructorRoute = require('./Router/instructor')
const studentRoute = require('./Router/student')
// const { default: admin } = require('./Schema/admin')

//API or paths


app.use('/instructorapi', instructorRoute)
app.use('/studentapi', studentRoute)
app.use('/adminapi', adminRoute)


app.listen(port, console.log("Server is created at port 4000")) 




// posting through just HTML

// to get response from signup.html file (input data).

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/signup.html')
// })

// to get response from login-signup.html file (input data).

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/login-sigup.html')
    
// })