import { Link } from "react-router-dom";

export default function Products() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-500">
          Productos
        </h2>

        <Link
          to="productos/nuevo"
          className="rounded-md bg-indigo-600 p-3 text-xs font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
      </div>
    </div>
  );
}
