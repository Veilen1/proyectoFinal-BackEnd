const fs = require("fs")

class CartCont {
    constructor(productos, carritos){
        this.productos = productos,
        this.carritos = carritos
    }

    async createCart(req, res){
        let content = await fs.promises.readFile(this.carritos)
        let contObj = JSON.parse(content)
        let newId;
        const ahora = new Date()
        if (contObj.length > 0) {
            newId = contObj.length + 1;
        } else {
            newId = 1
        }
        let cart = {
            id: newId,
            timestamp: ahora.toLocaleString(),
            products: []
        }
        contObj.push(cart)
        await fs.promises.writeFile(this.carritos, JSON.stringify(contObj))
        res.send(`carrito con el ID:${newId} creado con exito!`)
    }

    async deleteCart(req, res){
        const { id } = req.params
        let contenido = await fs.promises.readFile(this.carritos)
        let contObj = JSON.parse(contenido)
        const contFiltered = contObj.filter(cart => cart.id != id);
        await fs.promises.writeFile(this.carritos, JSON.stringify(contFiltered))
        res.send(`El carrito con ID: ${id} fue eliminado de la lista`);
    }

    async showProdOnCart(req,res){
        const { id } = req.params
        let content = await fs.promises.readFile(this.carritos)
        let contObj = JSON.parse(content)
        let objID = contObj.find(carrito => carrito.id == id)
        if(id){
            if(objID === undefined){
                res.send(`no se encontró el id asignado, intente nuevamente o busque otro id`)
            }else{
                res.send(objID.products)
            }
        }
    }

    async addProductOnCart(req,res){
        const { id, id_prod } = req.params
        let contentProd = await fs.promises.readFile(this.productos)
        let contentCart = await fs.promises.readFile(this.carritos)
        let contObjProd = JSON.parse(contentProd)
        let contObjCart = JSON.parse(contentCart)
        let objIDcart = contObjCart.find(carrito => carrito.id == id)
        let objIDprod = contObjProd.find(producto => producto.id == id_prod)
        objIDcart.products.push(objIDprod)
        res.send(`producto ${contObjProd.name} agregado al carrito con ID:${objIDcart.id} exitosamente!`)
        await fs.promises.writeFile(this.carritos, JSON.stringify(contObjCart))
    }

    async deleteProductFromCart(req, res){
        const { id, id_prod } = req.params
        let content = await fs.promises.readFile(this.carritos)
        let contObj = JSON.parse(content)
        let contCartFiltered = contObj.find(carrito => carrito.id == id)
        const prodFiltered = contCartFiltered.products.filter(product => product.id != id_prod)
        await fs.promises.writeFile(this.carrito, JSON.stringify(contCart))
        res.send(`El elemento con ID: ${id_prod} del carrito ${id} fue eliminado de la lista`);
    }
}

module.exports = CartCont