
//Remember this users.js file just provides a path (route) for main (node.js) file
//remeber this folders connects (exports) to Controller users.js file

const express = require('express')
const router = express.Router()

const { allusers, userbyid, login, signup, updatepassword, deleteuser } = require('../Controller/users');

//API or Paths

router.get('/allusers', allusers);
router.get('/oneuser/:id', userbyid);
router.post('/login', login);
router.post('/signup', signup);
router.put('/updatepassword/:email', updatepassword)
router.delete('/deleteuser/:username', deleteuser)

module.exports = router