const express = require('express');
const { Router } = express
const routerProductos = Router()
const { authMiddleware } = require('../middlewares');


const ContProd = require('../containers/contProd');
const listaProductos = new ContProd("src/json/products.json")

routerProductos.get("/:id?", (req,res) => {
    listaProductos.showProducts(req,res).then(val => res.send(val))
})

routerProductos.post("/", authMiddleware , (req, res) => {
    const producto = req.body
    listaProductos.addProduct(req, res, producto).then(val => res.send(val))
})

routerProductos.put("/:id", authMiddleware , (req, res) => {
    listaProductos.changeProduct(req, res).then(val => res.send(val))
})
routerProductos.delete("/:id", authMiddleware , (req, res) => {
    listaProductos.deleteById(req, res).then(val => res.send(val))
})


module.exports = routerProductos;