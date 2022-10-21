const express = require('express');
const CartCont = require('../containers/contCart');
const { Router } = express
const routerCarritos = Router()

const listaCarritos = new CartCont("src/json/products.json", "src/json/carts.json")

routerCarritos.post("/", (req, res) => {
    listaCarritos.createCart(req, res).then(val => res.send(val))
})

routerCarritos.delete("/:id", (req, res) => {
    listaCarritos.deleteCart(req, res).then(val => res.send(val))
})

routerCarritos.get("/:id/products", (req, res) => {
    listaCarritos.showProdOnCart(req, res).then(val => res.send(val))
})

routerCarritos.post("/:id/products/:id_prod", (req, res) => {
    listaCarritos.addProductOnCart(req, res).then(val => res.send(val))
})

routerCarritos.delete("/:id/products/:id_prod", (req, res) => {
    listaCarritos.deleteProductFromCart(req, res).then(val => res.send(val))
})

module.exports = routerCarritos;