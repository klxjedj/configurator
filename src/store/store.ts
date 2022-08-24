import {configureStore} from "@reduxjs/toolkit"
import configReducer from './slices/configSlice'
import viewReducer from './slices/viewSlice'
import { switchToNextView } from "./slices/viewSlice"


export const store=configureStore({
    reducer:{
        config:configReducer,
        view:viewReducer
    }
})


console.log(switchToNextView())

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;