import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {

    swaggerDefinition: {
        openapi: '3.1.0',
        tags: [
            {
                name: 'Products',
                description: 'Operaciones de API para productos'
            }
        ],
        info: {
            title: 'API de productos',
            version: "1.0.0",
            description: 'API de productos para la tienda en línea',
        }
    },
    apis: ['./src/router.ts']

}

const swaggerSpec = swaggerJSDoc(options)


export default swaggerSpec