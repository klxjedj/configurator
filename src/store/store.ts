import {configureStore} from "@reduxjs/toolkit"

import configReducer from './slices/configSlice'
import viewReducer from './slices/viewSlice'
import loadingStatusReducer from './slices/loadingStatusSlice'
import selectedAttrReducer from './slices/attrSlice'
import selectedOptionReducer from './slices/optionSlice'

export const store=configureStore({
    reducer:{
        config:configReducer,
        view:viewReducer,
        loadingStatus:loadingStatusReducer,
        selectedAttr:selectedAttrReducer,
        selectedOption:selectedOptionReducer,
    }
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;