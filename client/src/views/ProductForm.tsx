import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { Product } from "../types";

interface ProductFormProps {
  product?: Product;
  errors: Record<string, string>;
}

export default function ProductForm({ product, errors }: ProductFormProps) {
  const [nameFocused, setNameFocused] = useState(false);
  const [priceFocused, setPriceFocused] = useState(false);

  useEffect(() => {
    if (product?.name) {
      setNameFocused(true);
    }
    if (product?.price) {
      setPriceFocused(true);
    }
  }, [product]);
  return (
    <>
      <div className="mb-4 relative">
        <label
          className={`absolute left-3 text-gray-800 transition-all transform ${
            nameFocused || errors?.name
              ? "text-xs -translate-y-3 bg-white px-3"
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
          onBlur={(e) => setNameFocused(!!e.target.value)}
          defaultValue={product?.name}
        />
        {errors?.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </div>

      <div className="mb-4 relative">
        <label
          className={`absolute left-3 text-gray-800 transition-all transform ${
            priceFocused || errors?.price
              ? "text-xs -translate-y-3 bg-white px-3"
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
          onBlur={(e) => setPriceFocused(!!e.target.value)}
          defaultValue={product?.price}
        />
        {errors?.price && <ErrorMessage>{errors.price}</ErrorMessage>}
      </div>
    </>
  );
}
