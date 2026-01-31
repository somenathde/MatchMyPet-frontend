import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    authReady:false,
}
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.user= action.payload;
            state.authReady=true;
        },
        removeUser:(state,action)=>{
            state.user=null;
            state.authReady=true
        }
    }
})
export const {addUser,removeUser}=userSlice.actions;
export default userSlice.reducer;