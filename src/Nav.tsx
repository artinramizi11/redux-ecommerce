import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "./store/store";
import { logOut } from "./store/authSlice";

const Nav: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLogged = useSelector((state: RootState) => state.auth.isLogged)
 const totalOrders = useSelector((state: RootState) => state.products.totalOrders)
 const totalCartItems = useSelector((state: RootState) => state.products.totalCartItems)

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>ShopApp</h1>
        <div className="flex space-x-6 gap-5">
          <Link to="/" className="text-white hover:text-gray-200 transition">
            Home
          </Link>
         {isLogged && <>
          <div className="relative">
  <Link to="/cartItems" className="relative text-white hover:text-gray-200 transition duration-300">
    Cart Items
    <p className="absolute -top-1 -right-5 bg-blue-400 text-white text-xs rounded-full px-2 py-0.5">
      {totalCartItems}
    </p>
  </Link>
</div>
          <div className="relative">
  <Link to="/orders" className="relative text-white hover:text-gray-200 transition duration-300">
    Orders
    <p className="absolute -top-1 -right-5 bg-blue-400 text-white text-xs rounded-full px-2 py-0.5">
      {totalOrders}
    </p>
  </Link>
</div>
         </>}
          {!isLogged && <Link to="/login" className="text-white hover:text-gray-200 transition">
            Log In
          </Link>}
          {isLogged && <button onClick={() => dispatch(logOut())} className="text-white cursor-pointer hover:text-gray-200 transition">Log out</button>}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
