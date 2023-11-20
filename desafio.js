class ProductManager {
    #id= 1
    getProducts = []

    obtenerProducts(){
        return  this.getProducts
    }
    
        addProduct (title, description, price, thumbnail, code, stock,) 
        {  const newProduct =
            {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.#id++,
            }
            const codeExist = this.getProducts.find(product => product.code === code)
            if(codeExist) console.log (`El producto con code: ${code} ya existe`);
            this.getProducts.push (newProduct)
            
                    
        }
        getElementById(id){
             const idExist=this.getProducts.find(product => product.id === id)
            if (idExist) return (idExist);
            else console.log ("not found")
       
    }
   
}
const productManager= new ProductManager ()

productManager.addProduct("producto prueba","este es un producto prueba",200,"sin imagen","abc125",25 )
productManager.addProduct("producto prueba","este es un producto prueba",200,"sin imagen","abc125",25 )
console.log (productManager.obtenerProducts())
console.log (productManager.getElementById(4)) //no existe el id 4

