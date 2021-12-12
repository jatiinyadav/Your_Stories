const moongose = require('mongoose')

const UserSchema = new moongose.Schema({
    googleId: {
        type: String,
        require: true
    },
    displayName: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }, 
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = moongose.model('User', UserSchema)

// Data we are getting back after the user sign in With Google