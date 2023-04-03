import {createSlice} from "@reduxjs/toolkit"
import {MaxView } from "../Constant"


let currentView=0;

const viewSlice=createSlice({
    name:'view',
    initialState:currentView,
    reducers:{

        switchToView(state,action){
            state=action.payload;
            return state;
        }
    }
})

export const {switchToView}=viewSlice.actions;
export default viewSlice.reducer;