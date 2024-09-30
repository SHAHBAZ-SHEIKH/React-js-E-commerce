import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Order from './pages/order/Order'
import Cart from './pages/cart/Cart'
import AllProducts from './pages/allproducts/AllProducts'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Nopage from './pages/nopage/Nopage'
import MyState from './context/data/MyState'
import Login from './pages/registration/Login'
import Signup from './pages/registration/Signup'
import ProductInfo from './pages/productinfo/ProductInfo'
import AddProduct from './pages/admin/page/AddProduct'
import Updateproduct from './pages/admin/page/Updateproduct'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {




  return (
    <MyState>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/order' element={
            <procetedRouter>
              <Order />
            </procetedRouter>
          } />
          <Route path='/cart' element={<Cart />} />
          <Route path='/allproducts' element={<AllProducts />} />
          <Route path='/dashboard' element={
            <procetedRouterAdmin>
              <Dashboard />
            </procetedRouterAdmin>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path='/addproduct' element={
            <procetedRouterAdmin>
              <AddProduct />
            </procetedRouterAdmin>
          } />
          <Route path='/updateProduct' element={
            <procetedRouterAdmin>
              <Updateproduct />
            </procetedRouterAdmin>
          } />
          <Route path='/*' element={<Nopage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  )
}

export default App

export const procetedRouter = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    return children
  }
  else {
    return <Navigate to="/login" />
  }
}

export const procetedRouterAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  console.log(admin)
  if (admin.email = "ashabaz845@gmail.com") {
    return children
  }
  else {
    return <Navigate to="/login" />
  }
}
