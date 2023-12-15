
//this products.js Schema (different types of data) file shows the what type of data goes in products.js,
// products.js (located in Controllers folder) file like string, number or floats etc.

const mongoose = require("mongoose")

//Schema(types of data)

const productsSchema = new mongoose.Schema({
    productname: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
})

module.exports = mongoose.model('product', productsSchema)