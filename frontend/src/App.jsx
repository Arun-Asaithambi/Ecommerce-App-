import {Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import ShowProducts from './pages/ShowProducts';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import DeleteProduct from "./pages/DeleteProduct";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showProducts" element={<ShowProducts />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/editProduct" element={<EditProduct />} />
        <Route path="/deleteProduct" element={<DeleteProduct />} />
      </Routes>
    </>
  )
}

export default App;
