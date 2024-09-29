import axios from "axios";
import { ProductFailure, ProductRequest, ProductSuccess } from "../slice/productSlice";

export const getProduct = id => async (dispatch)=>{
    try {
        dispatch(ProductRequest())
        const { data } = await axios.get(`http://localhost:3000/products/product/${id}`)
        dispatch(ProductSuccess(data))
    }catch(error){
        dispatch(ProductFailure(error.response.data.message))
    }
}   