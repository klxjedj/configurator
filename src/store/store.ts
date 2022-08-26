import {configureStore} from "@reduxjs/toolkit"

import configReducer from './slices/configSlice'
import viewReducer from './slices/viewSlice'
import loadingStatusReducer from './slices/loadingStatusSlice'

export const store=configureStore({
    reducer:{
        config:configReducer,
        view:viewReducer,
        loadingStatus:loadingStatusReducer
    }
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;