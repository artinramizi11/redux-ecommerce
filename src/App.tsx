import React, { useEffect } from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider  } from 'react-router-dom'
import Nav from './Nav';
import Homepage from './pages/homepage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { getProducts, Product } from './store/productsSlice';
import SelectedProduct from './pages/SelectedProduct';
import Layout from './Layout';
import CartItems from './pages/CartItems';
import OrdersPage from './pages/OrdersPage';
import PrivateComponent from './PrivateComponent';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  { path: "/", element: <Layout />,children: [
    { index: true, element: <Homepage /> },
    { path:"/login", element:<LoginPage /> },
    { path:'/product/:id', element: <PrivateComponent><SelectedProduct /></PrivateComponent>},
    { path:"/cartitems", element:<PrivateComponent><CartItems /></PrivateComponent> },
    { path:"/orders", element:<PrivateComponent><OrdersPage /></PrivateComponent> },

  ] }, 
  
]);


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    fetch('https://dummyjson.com/products').then((res) => res.json()).then((data) => dispatch(getProducts(data.products)))
  },[])

  return (
   <>
    <RouterProvider router={router} />
   </>
  );
};

export default App