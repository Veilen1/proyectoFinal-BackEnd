const express = require('express');
const { Router } = express
const routerProductos = Router()
const { authMiddleware } = require('../middlewares');

routerProductos.get("/", (req,res) => {
    res.send("productos ok")
})

routerProductos.post("/", authMiddleware , (req, res) => {
    res.send("post de producto recibido")
})

module.exports = routerProductos;