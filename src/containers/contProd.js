const fs = require("fs")

class ContProd {
    constructor(archivo){
        this.archivo = archivo;
    }

    async showProducts(req,res){
        const id = req.params.id
        let content = await fs.promises.readFile(this.archivo)
        let contObj = JSON.parse(content)
        let objID = contObj.find(producto => producto.id == id)
        if(id){
            if(objID === undefined){
                res.send(`no se encontró el id asignado, intente nuevamente o busque otro id`)
            }else{
                console.log(objID);
                res.send(objID)
            }
        }else{
            res.send(contObj)
        }
    }

    async addProduct(req,res, producto){
        let content = await fs.promises.readFile(this.archivo)
        let contObj = JSON.parse(content)
        let newId;
        let ahora = new Date()
        if (contObj.length > 0) {
            newId = contObj.length + 1;
        } else {
            newId = 1
        }
        producto.timestamp = ahora.toLocaleString()
        producto.id = newId;
        contObj.push(producto)
        res.send(`producto ${producto.name} agregado a la lista exitosamente, ID:${newId}`)
        await fs.promises.writeFile(this.archivo, JSON.stringify(contObj))
    }

    async changeProduct(req, res){
        let contenido = await fs.promises.readFile(this.archivo)
        let contObj = JSON.parse(contenido)
        const { id } = req.params
        const product = req.body
        product.id = id
        contObj.splice(parseInt(id - 1), 1, product)
        await fs.promises.writeFile(this.archivo, JSON.stringify(contObj))
        res.send({ productoModificado: product })
    }

    async deleteById(req,res){
        const {id} = req.params
        let contenido = await fs.promises.readFile(this.archivo)
        let contObj = JSON.parse(contenido)
        const contFiltered = contObj.filter(producto => producto.id != id);
        await fs.promises.writeFile(this.archivo, JSON.stringify(contFiltered))
        res.send(`El elemento con ID: ${id} fue eliminado de la lista`);
    }

    async deleteAll(){
        let contenido = await fs.promises.readFile(this.archivo)
        let contObj = JSON.parse(contenido)
        contObj = []
        await fs.promises.writeFile(this.archivo, JSON.stringify(contObj))
        return console.log("Lista vaciada con exito!")
    }

}

module.exports = ContProd