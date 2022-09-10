import { createSlice } from "@reduxjs/toolkit";

let initialState=2;

const attrSlice=createSlice({
    name:'selectedAttr',
    initialState,
    reducers:{
        attrSelected(state,action){
            state=action.payload;
            return state;
        }
    }
})

export const {attrSelected}=attrSlice.actions
export default attrSlice.reducer