require('dotenv').config()

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


var corsMiddleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    next();
}

app.use(corsMiddleware);

app.use((req, res, next) => {
 console.log(req.path, req.method)
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
