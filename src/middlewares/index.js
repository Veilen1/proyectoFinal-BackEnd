require("dotenv").config()

const authMiddleware = (req, res, next) =>{
    if(process.env.ADMIN === "on"){
        next()
    }else{
        res.send("Error de Permisos")
    }
}

module.exports = {authMiddleware}