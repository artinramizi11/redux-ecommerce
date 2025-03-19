import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../store/store"
import { addToCart, Product, removeItemFromCart } from "../store/productsSlice"

function Pagination({ paginatedProducts }: { paginatedProducts: Product[] }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.products.cartItems);

  return (
    <>
      {paginatedProducts.length > 0 ? (
        paginatedProducts.map((product: Product) => (
          <div
            key={product.title}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
          >
            <h2
              onClick={() => navigate(`/product/${product.id}`)}
              className="text-xl font-semibold text-gray-900 hover:underline cursor-pointer"
            >
              {product.title}
            </h2>
            {product?.images && (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mt-2"
              />
            )}
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-lg font-bold text-green-600 mt-2">
              ${product.price}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            {cartItems.some((p) => p.id === product.id) ? (
              <button
                onClick={() => dispatch(removeItemFromCart({ id: product.id }))}
                className="mt-4 w-full bg-red-500 text-white font-medium py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
              >
                Remove From Cart
              </button>
            ) : (
              <button
                onClick={() => dispatch(addToCart(product))}
                className="mt-4 w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                Add To Cart
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg py-4">
          No products available on this page.
        </p>
      )}
    </>
  );
}

export default Pagination;
