import {Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import { HelmetProvider } from "react-helmet-async";
import "./App.css"
function App() {
  return (
    <div>
      <HelmetProvider>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        <Footer/>
      </HelmetProvider>
    </div>
  )
}

export default App;   
