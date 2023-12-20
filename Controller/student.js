
//For all student data. After giving API 
//(api is just a route name starting with '/' ) from Routes folder.
//Here we are connecting this file (controllers student.js) to its Schema structure located in Schema folder.
//Here we are defining all logic related to student like what, how , where can use this student data.

//Remember there are many ways to write this code.🚀🥳
//you can change or even make this code smaller to your liking. (inifinite possibilites😃)

// Student Controller

require('dotenv').config()
// const express=require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { hash, compare } = require('bcrypt')
const studentSchema = require('../Schema/student')

mongoose.connect(process.env.mongo_url)

//Find all student --  router.get('/getstudent', allStudents);

const allStudents = async (req, res) => {
    try {
        // await mongoose.connect(process.env.mongo_url)
        const student = await studentSchema.find()
        res.json({ message: "All student list.", list: student })
    }
    catch (err) {
        res.json({ message: err.message })
    }
}

//Find student by ID --  router.get('/onestudent/:id', studentById);

const studentById = async (req, res) => {
    try {
        // await mongoose.connect(process.env.mongo_url)
        const studentId = req.params.id
        const student = await studentSchema.findById(studentId)
        res.json(student)

    } catch (err) {
        res.json({ message: err.message })
    }
}

//Login  --  router.post('/postlogin', login);

const login = async (req, res) => {
    const { email, password } = req.body
    const student = await studentSchema.findOne({ email })

    if (student) {
        // matchpassword = await studentSchema.findOne({ password })
        const decryptPass = await compare(password, student.password)

        if (decryptPass) {

            try {
                const token = jwt.sign({ email: student.email, password: student.password }, process.env.JWT)
                // await mongoose.connect(process.env.mongo_url)
                res.json({ message: "Successfully logged in.", LoginData: token })
            } catch (err) {
                res.json({ message: err.message, LoggedInstudent: req.body })
            }
        }
        else {
            res.json({ message: "Password is not correct!" })
        }

    }
    else {
        res.json({ message: "Email is incorrect, plz check!" })
    }
}

//SignUp  --  router.post('/postsignup', signup);

const signup = async (req, res) => {
    const { studentName, email, password, gender } = req.body


    if (studentName == null || email == null || password == null || gender == null) {
        res.json({ message: "Plz enter required info first" })
    }
    else {
        try {
            const findstudentName = await studentSchema.findOne({ studentName })
            const findemail = await studentSchema.findOne({ email })
            if (!findstudentName && !findemail) {
                try {
                    // await mongoose.connect(process.env.mongo_url)
                    const hashedPass = await hash(password, 10)
                    const signup = studentSchema.create({ studentName, email, password: hashedPass, gender })
                    res.json({ message: "This student has signed up successfully.", SignedUpStudent: signup })
                    if (signup) {
                        try {
                            const transport = nodemailer.createTransport({
                                service: "gmail",
                                auth: {
                                    student: process.env.student,
                                    pass: process.env.pass
                                }
                            })

                            const textmail = {
                                from: process.env.student,
                                to: email,
                                subject: "Dear student you have successfully signed up.",
                                html: "<h1> Welocome.</h1>"
                                // html: "<h1> Welocome.</h1>"
                            }
                            await transport.sendMail(textmail)
                            res.json({ mesage: 'Sent email.' })
                        } catch (err) {
                            console.error(err)
                            res.json({ message: err.message })
                        }
                    }
                    else {
                        res.json({ message: "Email is not sent." })
                    }
                    // res.json({ message: "This student has signed up successfully.", SignedUpstudent: signup })

                } catch (err) {
                    console.error(err)
                    res.json({ message: err.message })
                }

            }
            else {
                res.json({ message: "This student's data already exits, create new one and try again." })
            }
        }
        catch (err) {
            console.error(err)
            res.json({ message: err.message })
        }
    }
}


//Update student  --  router.patch('/patchstudent/:id', updatestudent)

const updatePassword = async (req, res) => {
    try {
        const updatePassword = req.params.email
        const { password } = req.body
        const hashedPass = await hash(password, 10)
        const update = await studentSchema.updateOne(updatePassword, { password: hashedPass })

        // await mongoose.connect(process.env.mongo_url)
        res.json({ message: "Your password has been updated.", Updatedstudent: update })
    } catch (err) {
        res.json({ message: err.message })
    }
}

//Delete student  --  router.delete('/deleteStudent/:studentName', deleteStudent)

const deleteStudent = async (req, res) => {
    const studentId = req.params
    const find = await studentSchema.findById({ studentId })
    if (find) {
        try {
            // await mongoose.connect(process.env.mongo_url)
            const deleteStudent = await studentSchema.deleteOne({ studentName: studentId })

            res.json({ message: "Selected student has been deleted.", Deletedstudent: deleteStudent })
        } catch (err) {
            res.json({ message: err.message })
        }
    }
    else {
        res.json({ message: "There is no such student" })
    }
}

module.exports = { allStudents, studentById, login, signup, updatePassword, deleteStudent }