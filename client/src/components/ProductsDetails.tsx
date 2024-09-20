import { formatCurrency } from "../helpers";
import { deleteProduct } from "../services/ProductService";
import { Product } from "../types";
import {
	useNavigate,
	Form,
	ActionFunctionArgs,
	redirect,
	useFetcher,
} from "react-router-dom";

interface ProductDetailsProps {
	product: Product;
}

export async function action({ params }: ActionFunctionArgs) {
	if (params.id !== undefined) {
		await deleteProduct(+params.id);
		return redirect("/");
	}
}

export default function ProductsDetails({ product }: ProductDetailsProps) {
	const fetcher = useFetcher();
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
					<fetcher.Form method="POST">
						<button
							type="submit"
							name="id"
							value={product.id}
							className={`${
								isAvailability
									? "text-green-500 "
									: " text-gray-700 opacity-70 italic"
							} font-bold uppercase`}
						>
							{isAvailability ? "Disponible" : "No Disponible"}
						</button>
					</fetcher.Form>
				</td>
				<td className="p-3 text-lg text-gray-800 ">
					<div className="flex gap-2 justify-center">
						<button
							onClick={() =>
								navigate(`productos/${product.id}/editar`)
							}
							// className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
							className=" w-6 h-6 opacity-70"
						>
							<svg
								data-slot="icon"
								fill="none"
								stroke-width="1.5"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
								></path>
							</svg>
						</button>

						<Form
							className=""
							method="POST"
							action={`products/${product.id}/eliminar`}
							onSubmit={(e) => {
								if (
									!confirm(
										`Esta Seguro que desea Eliminar ${product.name}`
									)
								) {
									e.preventDefault();
								}
							}}
						>
							<button type="submit">
								<svg
									data-slot="icon"
									fill="none"
									stroke-width="1.5"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									className="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
									></path>
								</svg>
							</button>
						</Form>

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
