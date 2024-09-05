import {Request, Response} from 'express'
import Products from '../models/Products.model'
import { request } from 'http'
import { error } from 'console'

export const getProducts = async (req: Request, res:Response) => {
   
    const products = await Products.findAll({
            order : [
                ['id', 'DESC']
            ],
            limit: 3,
            attributes: { exclude : ['createdAt', 'updatedAt']}
       })
       res.json({data : products})
}

export const getProductById = async (req: Request, res:Response) => {
    
     //Parametro id paraindexar por elemento independiente, el id es porque en el router colocamos el parametro id
       const {id} = req.params
       const product = await Products.findByPk(id)

        if(!product) {
            return res.status(404).json({error  : 'Producto no encontrado'})
        }

       res.json({data : product})
}

export const createProduct = async (req : Request, res: Response) => {

    const product = await Products.create(req.body)
        res.status(201).json({data: product})
}

export const updatedProduct = async (req : Request, res: Response) => {
        // Verificar si el producto existe
       const {id} = req.params
       const product = await Products.findByPk(id)

        if(!product) {
            return res.status(404).json({error  : 'Producto no encontrado'})
        }
        await product.update(req.body)
        //Para quitar la proteccion y se actualice el registro completo eliminando los datos que no envias, y actualizando que estas mandando usar de la siguiente manera
        //product.name = req.body.name
        //product.price= req.body.price
        await product.save()

       res.json({data : product})

}

export const updatedAvailability = async (req : Request, res: Response) => {
    
    const {id} = req.params
    const product = await Products.findByPk(id)

    if(!product) {
        return res.status(404).json({error  : 'Producto no encontrado'})
    }

    //metodo para cambiar la disponibilidad del producto de manera automatica al consultar el patch
    product.availability = !product.dataValues.availability
    await product.save()

    res.json({data : product})
}

export const deleteProduct = async (req: Request, res: Response) => {

    const {id} = req.params
    const product = await Products.findByPk(id)

    if(!product) {
        return res.status(404).json({error  : 'Producto no encontrado'})
    }

    await product.destroy()
    res.json({data : "producto eliminado"})

}