import { combineReducers, configureStore} from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import productsReducer from "./slice/productsSlice";    
import productReducer from "./slice/productSlice";    
import authReducer from "./slice/authSlice";    

const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer,
    authState: authReducer,
});

const store = configureStore({
    reducer,
    // middleware: [thunk]
});

export default store;
