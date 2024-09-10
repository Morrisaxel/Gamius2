import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv"
import Products from "../models/Products.model";

//IMPORTAR LAS VARIABLES DE ENTORNO
dotenv.config()

//llamar a la variable de entorno
// console.log(process.env.DATABASE_URL)

const db = new Sequelize(process.env.DATABASE_URL!, {
    models : [__dirname + '/../models/**/*.ts'],
    logging: false,
})

db.addModels([Products])

export default db