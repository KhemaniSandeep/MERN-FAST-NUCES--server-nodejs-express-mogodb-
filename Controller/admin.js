
//Admin Controller

const mongoose = require('mongoose')
const adminSchema = require('../Schema/admin')

//Get All admins

const allAdmin = async (req, res) => {
    try {
        const findall = await adminSchema.find()
        res.json({ message: "These admin found", Found: findall })
    }
    catch (err) {
        res.json({ message: err.message })
    }
}

//Find admin By ID

const adminId = async (req, res) => {
    try {
        await mongoose.connect(process.env.mongo_url)
        const adminId = req.params.id;
        const find = await adminSchema.findById(adminId)
        if (find) {
            res.json({ message: 'Given id is found.', Found: find })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}

//Register admin

const createAdmin = async (req, res) => {
    try {
        await mongoose.connect(process.env.mongo_url)
        const { id, password, name, subject } = req.body
        const createAdmin = await adminSchema.create({ id, password, name, subject })
        res.json({ message: 'admin registered successfully.', data: createAdmin })
    }
    catch (err) {
        res.json({ message: err.message })
    }
}

//Update a admin

const updateAdmin = async (req, res) => {
    const { id, name, password, subject } = req.body
    const updateAdmin = req.params.id
    const findadmin = await adminSchema.findById(updateAdmin)

    if (!findadmin) {
        res.json({ message: "Provide correct admin id:" })
    }
    else {
        await adminSchema.updateOne({ id, name, password, subject })
        try {
            await mongoose.connect(process.env.mongo_url)
            res.json({ message: "The admin under given id has been updated.", Updated: req.body })
        } catch (err) {
            res.json({ message: err.message })
        }

    }
}

//Delete a admin

const deleteAdmin = async (req, res) => {
    try {
        const deleteAdmin = req.params.id
        await adminSchema.findById({ _id: deleteAdmin })
        const deleted = await adminSchema.deleteOne(deleteAdmin)
        await mongoose.connect(process.env.mongo_url)
        res.json({ message: "admin under given ID has been deleted!", Deleted: deleted })
    } catch (err) {
        res.json({ message: err.message })
    }
}

module.exports = { allAdmin, adminId, createAdmin, updateAdmin, deleteAdmin } 