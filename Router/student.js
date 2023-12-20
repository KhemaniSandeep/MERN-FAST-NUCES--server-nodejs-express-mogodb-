
//Remember this users.js file just provides a path (route) for main (node.js) file
//remeber this folders connects (exports) to Controller users.js file

// Student router

const express = require('express')
const router = express.Router()

const { allStudents, studentById, login, signup, updatePassword, deleteStudent} = require('../Controller/student');

//API or Paths

router.get('/allstudents', allStudents);
router.get('/student/:id', studentById);
router.post('/login', login);
router.post('/signup', signup);
router.put('/updatepass/:email', updatePassword)
router.delete('/deleteuser/:username', deleteStudent)

module.exports = router