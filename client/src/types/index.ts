import { boolean, number, object, string, InferOutput, array } from "valibot";

export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability : boolean()
})

export const ProductsSchema = array(ProductSchema)

//Si no es necesario modificar el type debemos usar esta manera
export type Product = InferOutput<typeof ProductSchema>;
//Si lo vamos a modificar utilizamos la siguiente forma
//export interface Product extends InferOutput<typeof ProductSchema> {
//  aditional: string;    
//}


export function toBoolen(str: string){
    return str.toLowerCase() === 'true'
}