const express = require("express")
const app = express()
const routerCarritos = require("./routes/carts")
const routerProductos = require("./routes/products")




app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"))

app.use("/api/products", routerProductos) //llamas routerProducts de routes igual que a carts
app.use("/api/carts", routerCarritos)



const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log("server running, listening PORT 8080");
})