import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import { addProduct } from "../services/ProductService";
import ProductForm from "./ProductForm";

// Acción para manejar la validación del formulario
export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  const errors: Record<string, string> = {};

  // Validación de campos vacíos
  if (!data.name) errors.name = "El nombre del producto es obligatorio";
  if (!data.price) errors.price = "El precio del producto es obligatorio";

  if (Object.keys(errors).length > 0) return errors;

  // Crear un nuevo producto
  await addProduct(data);

  return redirect("/");
}

export default function NewProduct() {
  const errors = useActionData() as Record<string, string>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="sm:text-xl md:text-1xl lg:text-4xl font-black text-slate-500">
          Registrar Producto
        </h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-xs font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a Producto
        </Link>
      </div>

      <Form className="mt-10" method="POST">
        <div className="mb-4 relative">
          <ProductForm errors={errors} />
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
