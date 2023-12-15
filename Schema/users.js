
//this users.js Schema(types of data) file shows the what type of data goes in users.js,
// users.js (located in Controllers folder) file like string, number or floats etc.

const mongoose = require('mongoose')

//Schema(types of data)

const usersSchema = new mongoose.Schema({
    username: { type: String, required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    gender:{type: String, required: true},
    role:{type:String, default: 'user'}
})

module.exports = mongoose.model('user', usersSchema)