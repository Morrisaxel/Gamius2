import express from "express"
import router from "./router"
import db from "./config/db"
import colors from "colors"

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.green("Conexion exitosa"))
        
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold("Hubo un error al conectar a la base de datos"))
        
    } 
}

connectDB()
// Instancia de express
const server = express()

//leer datos de formularios
server.use(express.json())

server.use('/api/products', router)

export default server