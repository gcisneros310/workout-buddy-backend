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

app.use((req, res, next) => {
 console.log(req.path, req.method)
res.header('Access-Control-Allow-Origin', 'localhost'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
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
