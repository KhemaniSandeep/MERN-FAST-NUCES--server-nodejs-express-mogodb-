
//this products.js Schema (different types of data) file shows the what type of data goes in products.js,
// products.js (located in Controllers folder) file like string, number or floats etc.



const mongoose = require ('mongoose')

// Instructor Schema(types of data)

const instructorSchema = new mongoose.Schema({
    id:{type: String, required: true, unique: true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    subject: { type: String, required: true },
    gender: { type: String, required: true },
    // class_level: { type: String, required: true },
    // class_timing:{type: String, required: true}
})

module.exports=mongoose.model('instructor', instructorSchema)