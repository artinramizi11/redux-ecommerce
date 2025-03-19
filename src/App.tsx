import  { useEffect } from 'react'
import {  createBrowserRouter, RouterProvider  } from 'react-router-dom'
import Homepage from './pages/homepage';
import { useDispatch } from 'react-redux';
import { getProducts } from './store/productsSlice';
import SelectedProduct from './pages/SelectedProduct';
import CartItems from './pages/CartItems';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import PrivateComponent from './Components/PrivateComponent';
import Layout from './Components/Layout';

const router = createBrowserRouter([
  { path: "/:page?/:id?", element: <Layout />,
    children: [
    { index: true, element: <Homepage /> },
    { path:"login", element:<LoginPage /> },
    { path:'product/:id', element: <PrivateComponent><SelectedProduct /></PrivateComponent>},
    { path:"cartitems", element:<PrivateComponent><CartItems /></PrivateComponent> },
    { path:"orders", element:<PrivateComponent><OrdersPage /></PrivateComponent> },

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