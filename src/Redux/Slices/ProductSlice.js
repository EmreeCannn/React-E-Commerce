import { createSlice } from "@reduxjs/toolkit";



const productSlice = createSlice({
    name:"products",
    initialState:{
        products:[]
    },
    reducers:{
        setProducts: (state,action) =>{
            state.products = action.payload
        }
    }
})

export const {setProducts} =productSlice.actions
export default productSlice.reducer

// productSlice.reducer diyerek productSlicemin ürettiği reducerları dışa aktarmak için kullanıyorum 
// productSlice.reducer, Redux store'un nasıl güncelleneceğini tanımlayan reducer fonksiyonudur.
// Redux store oluşturulurken reducer olarak kullanılmak üzere dışa aktarılır.