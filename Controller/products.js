
//For all Products data. After giving API 
//(api is just a route name starting with '/' ) from Routes folder.
//Here we are connecting this file (controllers products.js) to its Schema structure located in Schema folder
//Here we are defining all logic related to Products like what, how , where can use this Products data.

//Remember there are many ways to write this code.🚀🥳
//you can change or even make this code smaller to your liking. (inifinite possibilites😃)


const mongoose = require('mongoose')
const productsSchema = require('../Schema/products')

//Get All Products

const allProducts = async (req, res) => {
    try {
        const findall = await productsSchema.find()
        res.json({ messag: "These products found", Found: findall })
    }
    catch (err) {
        res.json({ message: err.message })
    }
}

//Find a Product By ID

const productId = async (req, res) => {
    try {
        await mongoose.connect(process.env.mongo_url)
        const productid = req.params.id;
        const find = await productsSchema.findById(productid)
        if (find) {
            res.json({ message: 'Given id is found.', Found: find })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}

//Create a Product

const createProduct = async (req, res) => {
    try {
        await mongoose.connect(process.env.mongo_url)
        const { productname, price, description } = req.body
        const createProduct = await productsSchema.create({ productname, price, description })
        res.json({ message: 'Product created successfully.', data: createProduct })
    }
    catch (err) {
        res.json({ message: err.message })
    }
}

//Update a Product

const updateProduct = async (req, res) => {
    const { productname, price, description } = req.body
    const updateproduct = req.params.id
    const findproduct = await productsSchema.findById(updateproduct)

    if (!findproduct) {
        res.json({ message: "Provide correct product id:" })
    }
    else {
        await productsSchema.updateOne({ productname, price, description })
        try {
            await mongoose.connect(process.env.mongo_url)
            res.json({ message: "The product under given id has been updated.", Updated: req.body })
        } catch (err) {
            res.json({ message: err.message })
        }

    }
}

//Delete a Product

const deleteProduct = async (req, res) => {
    try {
        const deleteproduct = req.params.id
        await productsSchema.findById({ _id: deleteproduct })
        const deleted = await productsSchema.deleteOne(deleteproduct)
        await mongoose.connect(process.env.mongo_url)
        res.json({ message: "Product under given ID has been deleted!", Deleted: deleted })
    } catch (err) {
        res.json({ message: err.message })
    }
}

module.exports = { allProducts, productId, createProduct, updateProduct, deleteProduct } 