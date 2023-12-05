const fs = require('node:fs');
class ProductManager {
  constructor(path) {
    this.products = []
    this.id = 1
    this.path = path
    this.loadFromFile()
  }

  async saveToFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
      console.log("Productos guardados");
    }
    catch (error) {
      console.log("Error al escribir el archivo: ", error.message);
    }
  }

  async loadFromFile() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8')
      this.products = JSON.parse(data)
    }
    catch (error) {
      console.log("Error al leer el archivo: ", error.message);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    // validacion para que todos los productos sean obligatorios:
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.log("Todos los campos son obligatorios");
    }

    // validacion para que no se repita el code:
    const productExist = this.products.find(prod => prod.code === code)
    if (productExist) return console.log(`El producto con el code ${code} ya existe`);

    const newProduct = {
      id: this.id++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    }
    this.products.push(newProduct)
    this.saveToFile()
  }

  getProducts() {
    return this.products
  }


getProductsById(idProduct) {

  const productById = this.products.find(prod => prod.id === idProduct);
  
  if (productById) {
  
  return productById;
  
  } else {
  
  return null;
  
  }
  
  }

//getProductsById(idProduct) {
 //const productById = this.products.find(prod => prod.id === idProduct)
 //if (productById) return console.log(productById);
// if (!productById) return console.log("Producto no encontrado");  }

  async updateProduct(id, updatedFields) {
    const prodToUpdate = this.products.find(prod => prod.id === id)

    if (prodToUpdate) {
      Object.assign(prodToUpdate, updatedFields)

      try {
        await fs.promises.writeFile('./products.json', JSON.stringify(this.products, null, 2))
        console.log("Producto actualizado");
      } catch (error) {
        console.log("Error al actualizar", error.message);
      }
    } else {
      console.log("Producto no encontrado");
    }
    this.saveToFile()
  }

  async deleteProduct(id) {
    const prodToDelete = this.products.findIndex(prod => prod.id === id)

    if (prodToDelete !== -1) {
      this.products.splice(prodToDelete, 1)
      console.log("Producto eliminado");

    } else {
      console.log("Producto no encontrado");
    }
  }

}
module.exports = ProductManager;
const path = "products.json"
const productManager = new ProductManager(path)



//productManager.addProduct("porta", "porta-agujas que sirve para suturar", 2500, "sin imagen", "IQ08", 12)
//productManager.addProduct("crille", "pinza hemostatica superficial", 1700, "sin imagen", "IQ09", 10)
//productManager.getProducts()

//productManager.addProduct("porta", "porta-agujas que sirve para suturar", 2500, "sin imagen", "IQ08", 12) // Repitiendo codigo para que no lo agregue
//productManager.addProduct("halsteeeed", "pinza hemostatica superficial", 1600, "sin imagen", "IQ10", 10)
//productManager.getProducts()

//productManager.getProductsById(2) // Obteniendo productos mediante ID

//productManager.updateProduct(1, { title: "bertola", description:"pinza hemostatica para profundidad", price: 2000 }) // actualizando productos

//productManager.deleteProduct(2) // Eliminando productos segun id

