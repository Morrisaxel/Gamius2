import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";

import { getProductsById, updatedProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "./ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductsById(+params.id);
    if (!product) {
      throw new Response("", { status: 404, statusText: "No encontrado" });
    }
    return product;
  }
}

// Acción para manejar la validación del formulario
export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  const errors: Record<string, string> = {};

  // Validación de campos vacíos
  if (!data.name) errors.name = "El nombre del producto es obligatorio";
  if (!data.price) errors.price = "El precio del producto es obligatorio";

  if (Object.keys(errors).length > 0) return errors;

  // Crear un nuevo producto
  if (params.id !== undefined) {
    await updatedProduct(data, +params.id);
    return redirect("/");
  }
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function EditProduct() {
  const errors = useActionData() as Record<string, string>;
  const product = useLoaderData() as Product;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="sm:text-xl md:text-1xl lg:text-4xl font-black text-slate-500">
          Editar Producto
        </h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-xs font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a Producto
        </Link>
      </div>

      <Form className="mt-10" method="POST">
        <ProductForm product={product} errors={errors} />

        <div className="mb-4">
          {/* <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label> */}
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </div>
  );
}
