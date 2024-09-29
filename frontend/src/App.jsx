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

function App() {
  return (
    <div>
      <HelmetProvider>
        <Header/>
        <ToastContainer theme="dark" />
          <div className="container container-fluid">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/product/:id" element={<ProductDetails/>} />
            </Routes>
          </div>
        <Footer/>
      </HelmetProvider>
    </div>
  )
}

export default App;   
