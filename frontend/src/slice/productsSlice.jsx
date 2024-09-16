import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState:{
        loading : false
    },
    reducers: {
        ProductsRequest(state, action) {
            return{
                loading : true
            }
        },
        ProductsSuccess(state, action) {
            return{
                loading : false,
                products: action.payload.product
            }
        },
        ProductsFailure(state, action) {
            return{
                loading: false,
                error: action.payload
            } 
        }
    } 
});

const {actions, reducer} = productsSlice;

export const {ProductsRequest, ProductsSuccess, ProductsFailure} = actions;
export default reducer;  
