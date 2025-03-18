import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addToCart, Product, removeFromCart } from '../store/productsSlice';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

  const products = useSelector((state: RootState) => state.products.products);
  const cartItems = useSelector((state:RootState) => state.products.cartItems)



  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <div
              key={product.title}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h2 onClick={() => {
                navigate(`/product/${product.id}`)
              } } className="text-xl font-semibold text-gray-900 hover:underline cursor-pointer">
                {product.title}
              </h2>
              {product?.images && <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover rounded-lg mt-2"  />}
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
              {cartItems.some(p => p.id === product.id) ? 
              <button onClick={() => dispatch(removeFromCart({id: product.id}))} className="mt-4 w-full bg-red-300 hover:bg-red-400 text-white font-medium py-2 rounded-lg hover:bg-red-300 transition cursor-pointer">
                Remove From Cart
              </button> 
              : 
              <button onClick={() => dispatch(addToCart(product))} className="mt-4 w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-green-500 transition cursor-pointer">
                Add To Cart
              </button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
