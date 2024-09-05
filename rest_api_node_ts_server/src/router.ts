import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updatedAvailability, updatedProduct } from "./handlers/products";
import { handleInputErrors } from "./middlewares";

const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: El ID del producto
 *                      example: 1 
 *                  name: 
 *                      type: string
 *                      description: El Nombre del producto
 *                      example: Monitor Curvo de 49 Pulgadas 
 *                  price:
 *                      type: integer
 *                      description: Precio del producto
 *                      example: 500
 *                  availability:
 *                      type: boolean
 *                      description: La Disponibilidad del producto
 *                      example: true 
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Obtiene una lista de productos
 *          tags:
 *               - Products
 *          description: Retornar una lista de Productos
 *          responses: 
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                    $ref: '#/components/schemas/Product'
 *                          
 * 
 * 
 * 
 */

router.get("/", getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *      summary: Obtener un producto por ID
 *      tags: 
 *           - Products
 *      description: Retorna un producto basado en un id
 *      parameters:
 *         - in: path
 *           name: id
 *           description: Id del Producto a consultar
 *           required: true 
 *           schema:
 *              type: integer
 *      responses:
 *            200:
 *              description: Succesful Responses
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 * 
 *            400:
 *              description: Bad Request - Invalid ID
 * 
 *            404:
 *              description: Not Found
 * 
 */



router.get("/:id", 
    [
        param('id').isInt().withMessage("Id No Valido"),
        handleInputErrors,
    ]
    ,getProductById)

/**
 * @swagger
 * /api/products:
 *     post:
 *          summary: Creacion de nuevo producto
 *          tags:
 *              - Products
 *          description: Agrega un Nuevo Producto a la Base de Datos
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Playstation 5 Edition Limited"                        
 *                              price:
 *                                  type: number                      
 *                                  example: 399
 *          responses:
 *              201:
 *                  description: Succesful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                   description: Bad Request - Invalid Data
 *
 *  */    


router.post("/", 
    
    [body('name')
        .notEmpty().withMessage("El nombre del Producto no puede ir vacio"),

    body('price')
        // .isEmpty().withMessage("El precio del producto no puede ir vacio")
        .isNumeric().withMessage("El precio del producto debe ser un numero")
        .custom(value => value > 0).withMessage("El precio del producto debe ser mayor a 0")
    ],
    handleInputErrors,
    createProduct)
    
/**
 * @swagger
 *  /api/products/{id}:
 *      put:
 *          summary: Actualizacion de Productos con id
 *          tags:
 *             - Products
 *          description: Retorna la actualizacion del Producto
 *          parameters:
 *            - in: path
 *              name: id
 *              description: Id del Producto a consultar
 *              required: true 
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Playstation 5 Edition Limited"                        
 *                              price:
 *                                  type: number                      
 *                                  example: 399
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Succesful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 *          
 * 
 */
router.put("/:id", 
    
    [
        param('id').isInt().withMessage("Id No Valido"),
        body('name')
        .notEmpty().withMessage("El nombre del Producto no puede ir vacio"),

        body('price')
        // .isEmpty().withMessage("El precio del producto no puede ir vacio")
        .isNumeric().withMessage("El precio del producto debe ser un numero")
        .custom(value => value > 0).withMessage("El precio del producto debe ser mayor a 0"),

        body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no Valido')
    ],
    handleInputErrors,
    updatedProduct)
/**
 * @swagger
 *   /api/products/{id}:
 *      patch:
 *           summary: Update Product availability
 *           tags:
 *              - Products
 *           description: Retorna la disponibilidad actualizada
 *           parameters:
 *            - in: path
 *              name: id
 *              description: Id del Producto a consultar
 *              required: true 
 *              schema:
 *                  type: integer
 *           responses:
 *              200:
 *                  description: Succesful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 * 
 *          
 * 
 */
router.patch("/:id", 
    [
        param('id').isInt().withMessage("Id No Valido")
    ],
    handleInputErrors,
    updatedAvailability)
/**
 * @swagger
 *  /api/products/{id}:
 *      delete:
 *           summary: Remove Product
 *           tags:
 *              - Products
 *           description: Elimina un Producto ya existente
 *           parameters:
 *            - in: path
 *              name: id
 *              description: Id del Producto a eliminar
 *              required: true 
 *              schema:
 *                  type: integer
 *           responses:
 *              200:
 *                  description: Succesful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: "producto eliminado"
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 * 
 * 
 * 
 */


router.delete("/:id",  
    [
        param('id').isInt().withMessage("Id No Valido")
    ],
    handleInputErrors,
    deleteProduct)

export default router
