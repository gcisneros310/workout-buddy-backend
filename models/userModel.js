const mongoose = require('mongoose')

// bcrypt used for hashing user passwords by appending salts to user passwords
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static method for creating accounts
userSchema.statics.signup = async function(email, password) {

    // validate password

    if(!email || !password) {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('Must use a valid email')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Must use a stronger password')
    }
    const exists = await this.findOne({email})

    if(exists) {
        throw Error('email already in use')
    }

    // create salt
    const salt = await bcrypt.genSalt(10)
    // append salt to plaintext password
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email: email, password: hash})

    return user
}

// static method for logging in accounts

userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error('email is incorrect')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('passwords is incorrect')
    }

    return user

}

module.exports = mongoose.model('User', userSchema)