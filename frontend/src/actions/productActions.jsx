import axios from "axios";
import { ProductsFailure, ProductsRequest, ProductsSuccess } from "../slice/productsSlice";
import { ProductFailure, ProductRequest, ProductSuccess } from "../slice/productSlice";

export const getProducts = (keyword, price, category, rating, currentPage) => async (dispatch)=>{
    try {
        dispatch(ProductsRequest())
        let link = `http://localhost:3000/products?page=${currentPage}`;

        if(keyword){
            link += `&keyword=${keyword}`;
        }
        if(price){
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        }
        if(category){
            link += `&category=${category}`;
        }
        if(rating) {
            link += `&ratings=${rating}`
        }

        const { data } = await axios.get(link)
        dispatch(ProductsSuccess(data))
    }catch(error){
        dispatch(ProductsFailure(error.response.data.message))
    }
}   



export const getProduct = id => async (dispatch)=>{
    try {
        dispatch(ProductRequest())
        const { data } = await axios.get(`http://localhost:3000/products/product/${id}`)
        dispatch(ProductSuccess(data))
    }catch(error){
        dispatch(ProductFailure(error.response.data.message))
    }
}   