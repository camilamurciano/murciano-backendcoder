const express = require('express')
const ProductManager = require('./desafio2')

//const app = express()
//const port = 8080


//const productManager = new ProductManager('./products.json')


const app = express();
const port = 8080;
const productManager = new ProductManager("./products.json");

app.get('/products', async (req, res) => {
    
    const { limit } = req.query

    const products = await productManager.getProducts()
    
    if(limit) {
        return res.json({products: products.slice(0,limit)})
    }

    res.json({ products: products })
})

app.get('/products/:pid', async (req, res) => {

    const { pid } = req.params

    const productId = await productManager.getProductsById(Number(pid))

    if(productId){
        res.json({ products: productId })
    }
    else{
        res.json({ Error: "Producto no Encontrado"})
    }
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})
