import { formatCurrency } from "../helpers";
import { Product } from "../types";
import { useNavigate } from "react-router-dom";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductsDetails({ product }: ProductDetailsProps) {
  const isAvailability = product.availability;
  const navigate = useNavigate();

  return (
    <>
      <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">{product.name}</td>
        <td className="p-3 text-lg text-gray-800">
          {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
          {isAvailability ? "Disponible" : "No Disponible"}
        </td>
        <td className="p-3 text-lg text-gray-800 ">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => navigate(`productos/${product.id}/editar`)}
              className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
            >
              Editar
            </button>

            {/* <Link
              to={`productos/${product.id}/editar`}
              className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
            >
              Editar
            </Link> */}
          </div>
        </td>
      </tr>
    </>
  );
}
