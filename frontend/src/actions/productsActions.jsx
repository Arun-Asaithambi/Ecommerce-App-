import axios from "axios";
import { ProductsFailure, ProductsRequest, ProductsSuccess } from "../slice/productsSlice";

export const getProducts = async (dispatch)=>{
    try {
        dispatch(ProductsRequest())
        const { data } = await axios.get("http://localhost:3000/products")
        dispatch(ProductsSuccess(data))
    }catch(error){
        dispatch(ProductsFailure(error.response.data.message))
    }
}