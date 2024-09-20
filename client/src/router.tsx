import { createBrowserRouter } from "react-router-dom";
import Layouts from "./layouts/Layout";
import Products, {
	loader as productsLoader,
	action as updateAvailabilityAction,
} from "./views/Products";
import NewProduct, { action as NewProductAction } from "./views/NewProduct";
import EditProduct, {
	loader as editProductLoader,
	action as editProductAction,
} from "./views/EditProduct";
import { action as deleteProductsAction } from "./components/ProductsDetails";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layouts />,
		children: [
			{
				index: true,
				element: <Products />,
				loader: productsLoader,
				action: updateAvailabilityAction,
			},

			{
				path: "productos/nuevo",
				element: <NewProduct />,
				action: NewProductAction,
			},
			{
				path: "productos/:id/editar", // ROA Pattern - Resource-oriented design
				element: <EditProduct />,
				loader: editProductLoader,
				action: editProductAction,
			},

			{
				path: "products/:id/eliminar",
				action: deleteProductsAction,
			},
		],
	},
]);
