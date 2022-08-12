require('dotenv').config()

const cors = require('cors')
port = process.env.PORT || 4000
const express = require('express')

const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
 
const host = '0.0.0.0'
// instantiate express
const app = express()

//middleware
app.use(express.json())

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions)) // Use this after the variable declaration

app.use((req, res, next) => {
    console.log(req.path, req.method)

    res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    // console.log('app.use function running real quick')
    next()
})

// retrieves routes from workouts and user
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to MongoDB cluster

if(process.env.PORT){
    console.log(port)
}


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests
    app.listen((process.env.PORT || 4000), host, () => {
        console.log('connected to DB and listening on PORT', port)    
    })
})
.catch((error) => { // catch error in case of bad authentication / failed authentication
    console.log(error)
})
