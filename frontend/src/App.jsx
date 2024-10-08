import {Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from "./components/product/productDetails";
import ProductSearch from "./components/product/productSearch";
import Login from "./components/user/login";
import Register from "./components/user/register";
import store from "./store";
import { useEffect } from "react";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/profile";
import ProtectedRoute from "./components/route/protectedRoute";
import UpdateProfile from "./components/user/updateProfile";

function App() {

useEffect(() =>{
  store.dispatch(loadUser)
})


  return (
    <div>
      <HelmetProvider>
        <Header/>
        <ToastContainer theme="dark" />
          <div className="container container-fluid">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/search/:keyword" element={<ProductSearch/>} />
              <Route path="/product/:id" element={<ProductDetails/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/myprofile" element={<ProtectedRoute> <Profile/> </ProtectedRoute>} />
              <Route path="/myprofile/update" element={<ProtectedRoute> <UpdateProfile/> </ProtectedRoute>} />
            </Routes>
          </div>
        <Footer/>
      </HelmetProvider>
    </div>
  )
}

export default App;   
