import {Request, Response} from 'express'
import Products from '../models/Products.model'
import { check, validationResult } from 'express-validator'


export const createProduct = async (req : Request, res: Response) => {

    // const product = new Products(req.body)

    // const savedProduct = await product.save()
    // res.json({data : savedProduct})

    //validacion
    await check('name').notEmpty().withMessage("El nombre del Producto no puede ir vacio").run(req)
    

    const product = await Products.create(req.body)
    res.json({data: product})
    
}