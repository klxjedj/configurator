import {createSlice} from "@reduxjs/toolkit"

interface configState{
    [prop:string]:string
}


const initialConfig:configState={
    'comp1':'red',
    'comp2':'blue',
    'comp3':'pink'
}

const configSlice=createSlice({
    name:"config",
    initialState:initialConfig,
    reducers:{
        configChange(state,action){
            state[action.payload.id]=action.payload.value
        }

    }
})

export const {configChange}=configSlice.actions
export default configSlice.reducer;