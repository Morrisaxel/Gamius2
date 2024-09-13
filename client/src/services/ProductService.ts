import { safeParse } from "valibot"
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types"
import axios from "axios"

interface ProductData {
    [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData) {
    
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })

        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })

        }else {
            throw new Error("Datos no Validos")
        }

    } catch (error) {
        console.log(error)
        
    }
    
}


export async function getProducts() {
    
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)

        
        const result = safeParse(ProductsSchema, data.data)
        
        if(result.success){
            return result.output
        }else{ 
            throw new Error("Hubo un error al obtener Productos")
        }

    } catch (error) {
        console.log(error)
    }
}

export async function getProductsById(id : Product['id']) {
    
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)

        
        const result = safeParse(ProductSchema, data.data)
        
        if(result.success){
            return result.output
        }else{ 
            throw new Error("Hubo un error al obtener Productos")
        }

    } catch (error) {
        console.log(error)
    }
}