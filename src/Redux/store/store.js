import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlice"
import productReducer from "../Slices/ProductSlice"

export default configureStore({
    reducer:{
        user:userReducer,
        products:productReducer
    }
})