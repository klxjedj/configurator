import { createSlice } from "@reduxjs/toolkit";

let initialState=2;

const optionSlice=createSlice({
    name:'selectedOption',
    initialState,
    reducers:{
        optionSelected(state,action){
            state=action.payload;
            return state;
        }
    }
})

export const {optionSelected}=optionSlice.actions
export default optionSlice.reducer