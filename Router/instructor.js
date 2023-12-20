
//Remember this installInstructors.js file just provodes a path (route) for main (node.js) file
//remeber this folders connects (exports) to Controller installInstructors.js file

// Instructor router

const express = require('express');
const router = express.Router();

const { allInstructor, instructorId, login, updateInstructor, deleteInstructor } = require('../Controller/instructor');

//API or paths

router.get('/getall', allInstructor)
router.get('/:id', instructorId)
router.post('/login', login)
router.patch('/patch/:id', updateInstructor)
router.delete('/delete/:id', deleteInstructor)

module.exports = router;