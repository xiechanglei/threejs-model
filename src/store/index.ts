import {configureStore} from "@reduxjs/toolkit"
import {TestReducer} from "@/store/test.store"

const composeReducer = {...TestReducer}

export const store = configureStore({reducer: composeReducer})