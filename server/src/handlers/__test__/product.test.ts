import request from "supertest";
import server from "../../server";


describe('POST /api/products', () => {

    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')

        expect(response.body.errors).toHaveLength(3)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)

    })

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Test',
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')

        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)

    })

    it('should validate that the price is a number greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Test',
            price: 'hola'
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')

        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(1)

    })

    it('Should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Test Product',
            price: 10.99
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
        
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
    })
})

describe('GET /api/products', () => {

    //testeamos primero que la url exista para luego testear lo que queremos esperar

    it('should check if api/products url exists', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })


    it('should return a list of products', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body).not.toHaveProperty('errors')


    })
})

describe('GET /api/products/:id', () => {
    it('should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe("Producto no encontrado")

    })

    it('should check a valid ID in the URL', async () => {
        const response = await request(server).get(`/api/products/not-valid`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Id No Valido")

    })

    it('GET a JSON response for a single product', async () => {
        const response = await request(server).get(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

    })
})

describe('PUT /api/products/:id', () => {

    it('should check a valid ID in the URL', async () => {
        const response = await request(server).put(`/api/products/not-valid`).send({
            name: 'New Product',
            price: 100,
            availability : false
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Id No Valido")

    })

    it('should display validation error message when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })
    it('should validate that the price is greater than 0', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: 'New Product',
            price: -100,
            availability : false
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("El precio del producto debe ser mayor a 0")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it('should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: 'New Product',
            price: 300,
            availability : false
        })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it('should update an existing product with valid data', async () => {
        const response = await request(server).put(`/api/products/1`).send({
            name: 'New Product',
            price: 300,
            availability : false
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })
})

describe('PATCH /api/products/:id', () => {
    it('Should returna 404 response for a non-existing product', async () => {
        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)
        
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

        
    })

    it('should update the product availability', async () => {
        const response = await request(server).patch('/api/products/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(true)
        
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
        
    })
})


describe('DELETE /api/products/:id', () => {
    it('should check a valid ID', async () => {
        const response = await request(server).delete('/api/products/not-valid')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('Id No Valido')

    })

    it('should return a 404 response for a noon-existent product', async () => {
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)
            
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)
    }) 

    it('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("producto eliminado")

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        
    })
}) 



