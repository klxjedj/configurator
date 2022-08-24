import {createSlice} from "@reduxjs/toolkit"
import {MaxView } from "../Constant"


let currentView=1;

const viewSlice=createSlice({
    name:'view',
    initialState:currentView,
    reducers:{
        switchToNextView:state=>{
            state<MaxView?state+=1:state=1;
            return state

        },
        switchToPreviousView(state,action){
            state>1?state-=1:state=MaxView;
            return state;
        },
        switchToView(state,action){
            state=action.payload;
            return state;
        }
    }
})

export const {switchToNextView,switchToPreviousView,switchToView}=viewSlice.actions;
export default viewSlice.reducer;