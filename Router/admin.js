
//Admin Router

const express =require('express')
const router = express.Router()

const {allAdmin, adminId, createAdmin, updateAdmin, deleteAdmin} = require('../Controller/admin')

router.get('/getall', allAdmin)
router.get('/get/:id', adminId)
router.post('/post', createAdmin)
router.patch('/patch/:id', updateAdmin)
router.delete('/delete/:id', deleteAdmin)

module.exports = router