
//For all instructor data. After giving API 
//(api is just a route name starting with '/' ) from Routes folder.
//Here we are connecting this file (controllers instructor.js) to its Schema structure located in Schema folder
//Here we are defining all logic related to instructor like what, how , where can use this instructor data.

//Remember there are many ways to write this code.🚀🥳
//you can change or even make this code smaller to your liking. (inifinite possibilites😃)

// Instructor Controller

const mongoose = require('mongoose')
const instructorSchema = require('../Schema/instructor')

//Get All Instructors

const allInstructor = async (req, res) => {
    try {
        const findall = await instructorSchema.find()
        res.json({ message: "These instructor found", Found: findall })
    }
    catch (err) {
        res.json({ message: err.message })
    }
}

//Find Instructor By ID

const instructorId = async (req, res) => {
    try {
        // await mongoose.connect(process.env.mongo_url)
        const instructorId = req.params.id;
        const find = await instructorSchema.findById(instructorId)
        if (find) {
            res.json({ message: 'Given id is found.', Found: find })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}

//Register instructor

const createInstructor = async (req, res) => {
    try {
        // await mongoose.connect(process.env.mongo_url)
        const { id, name, email, password, gender, subject } = req.body
        const createInstructor = await instructorSchema.create({ id, name, email, password, gender, subject })
        res.json({ message: 'Instructor registered successfully.', data: createInstructor })
    }
    catch (err) {
        res.json({ message: err.message })
    }
}

//Update a instructor

const updateInstructor = async (req, res) => {
    const { id, name, password, subject } = req.body
    const updateInstructor = req.params.id
    const findinstructor = await instructorSchema.findById(updateInstructor)

    if (!findinstructor) {
        res.json({ message: "Provide correct instructor id:" })
    }
    else {
        await instructorSchema.updateOne({ id, name, password, subject })
        try {
            // await mongoose.connect(process.env.mongo_url)
            res.json({ message: "The instructor under given id has been updated.", Updated: req.body })
        } catch (err) {
            res.json({ message: err.message })
        }

    }
}

//Delete a instructor

const deleteInstructor = async (req, res) => {
    try {
        const deleteInstructor = req.params.id
        await instructorSchema.findById({ _id: deleteInstructor })
        const deleted = await instructorSchema.deleteOne(deleteInstructor)
        // await mongoose.connect(process.env.mongo_url)
        res.json({ message: "Instructor under given ID has been deleted!", Deleted: deleted })
    } catch (err) {
        res.json({ message: err.message })
    }
}

module.exports = { allInstructor, instructorId, createInstructor, updateInstructor, deleteInstructor } 