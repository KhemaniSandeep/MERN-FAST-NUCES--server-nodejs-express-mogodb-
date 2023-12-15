
//Remember this products.js file just provodes a path (route) for main (node.js) file
//remeber this folders connects (exports) to Controller products.js file

const express = require('express');
const router = express.Router();

const { allProducts, productId, createProduct, updateProduct, deleteProduct } = require('../Controller/products');

//API or paths

router.get('/getall', allProducts)
router.get('/get/:id', productId)
router.post('/post', createProduct)
router.patch('/patch/:id', updateProduct)
router.delete('/delete/:id', deleteProduct)

module.exports = router;