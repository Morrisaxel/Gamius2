import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { useState } from "react";

// Acción para manejar la validación del formulario
export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  const errors: Record<string, string> = {};

  // Validación de campos vacíos
  if (!data.name) errors.name = "El nombre del producto es obligatorio";
  if (!data.price) errors.price = "El precio del producto es obligatorio";

  if (Object.keys(errors).length > 0) return errors;
  return {};
}

export default function NewProducts() {
  const errors = useActionData() as Record<string, string>;
  const [nameFocused, setNameFocused] = useState(false);
  const [priceFocused, setPriceFocused] = useState(false);

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
          <label
            className={`absolute left-3 text-gray-800 transition-all transform ${
              nameFocused || errors?.name
                ? "text-xs -translate-y-6"
                : "translate-y-3"
            }`}
            htmlFor="name"
          >
            Nombre Producto
          </label>
          <input
            id="name"
            type="text"
            className={`mt-2 block w-full p-3 bg-gray-50 border ${
              errors?.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder=""
            name="name"
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
          />
          {errors?.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </div>

        <div className="mb-4 relative">
          <label
            className={`absolute left-3 text-gray-800 transition-all transform ${
              priceFocused || errors?.price
                ? "text-xs -translate-y-6"
                : "translate-y-3"
            }`}
            htmlFor="price"
          >
            Precio Producto
          </label>
          <input
            id="price"
            type="number"
            className={`mt-2 block w-full p-3 bg-gray-50 border ${
              errors?.price ? "border-red-500" : "border-gray-300"
            }`}
            placeholder=""
            name="price"
            onFocus={() => setPriceFocused(true)}
            onBlur={() => setPriceFocused(false)}
          />
          {errors?.price && <ErrorMessage>{errors.price}</ErrorMessage>}
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
