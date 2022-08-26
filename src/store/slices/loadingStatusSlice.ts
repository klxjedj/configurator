import { createSlice } from "@reduxjs/toolkit";

let initialState="loading";

const loadingStatusSlice=createSlice({
    name:'loadingStatus',
    initialState,
    reducers:{
        changeLoadingStatus(state){
            state="loaded";
            return state;
        }
    }
})

export const {changeLoadingStatus}=loadingStatusSlice.actions
export default loadingStatusSlice.reducer