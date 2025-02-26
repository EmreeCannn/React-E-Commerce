import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null
    },
    reducers:{
        updateUser :(state,action)=>{
            state.currentUser=action.payload
        },
        removeUser :(state) =>{
            state.currentUser=null;
        }
    }
})

export const {updateUser,removeUser} = userSlice.actions

export default userSlice.reducer