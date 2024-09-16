import { createBrowserRouter } from "react-router-dom";
import Layouts from "./layouts/Layout";
import Products, { loader as productsLoader } from "./views/Products";
import NewProduct, { action as NewProductAction } from "./views/NewProduct";
import EditProduct, {
  loader as editProductLoader,
  action as editProductAction,
} from "./views/EditProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
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
    ],
  },
]);
