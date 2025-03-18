import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { checkOutCart, Product, removeFromCart } from '../store/productsSlice'

const CartItems = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.products.cartItems);
    const totalPrice = cartItems.reduce((acc,product) => product.price + acc , 0)

    return (
        <div>
{cartItems.length === 0 && 
  <p className="text-center text-lg text-gray-500 mt-10 font-semibold">
    You have no products in your cart
  </p>
}
        {cartItems.length > 0 && cartItems.map((product) => {
          return (
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <img src={product.images[0]} alt={product.title} className="w-20 h-20 object-cover rounded-md" />
              <div className="flex-grow ml-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
                <p className="text-lg text-gray-600">${product.price}</p>
              </div>
              <button onClick={() => dispatch(removeFromCart({id: product.id}))} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 cursor-pointer">
                Remove from cart
              </button>
              <div className="mt-6 text-right">
        </div>
            </div>);
        }) }
        {cartItems.length > 0 &&  <div className="p-4 mt-4 bg-gray-100 rounded-lg shadow-md">
    <h1 className="text-2xl font-semibold text-gray-900">Total price of all items: ${Math.ceil(totalPrice)}</h1>
    <button
      onClick={() => {
        dispatch(checkOutCart())
      }}
      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300 transform hover:scale-105 shadow-lg active:scale-95 mt-4"
    >
      Check out
    </button>
  </div> }
       
      </div>
      
  )
}

export default CartItems