import {createSlice} from "@reduxjs/toolkit"
import {creatActionsHook, createNoParamActionsHook, createSelectorHook} from "@/store/handler"

const initialState = {value: 0}

const {actions, reducer, name} = createSlice({
    name: "test",
    initialState,
    reducers: {
        incremented: state => {
            state.value += 1
        },
        decremented: state => {
            state.value -= 1
        }
    }
})

//提供给store用以注册reducer
export const TestReducer = {[name]: reducer}

//提供给组件用以快捷的获取dispatchAction
export const useTestActions = creatActionsHook(actions)

//提供给组件用以快捷的获取dispatchAction,并且这些action都是不需要传递参数的,用以优化代码，这些action可以直接设置为组件的事件而不需要包装一边
export const useTestActionsWithNoParams = createNoParamActionsHook(actions)

//描述多一炮action

//提供给组件用于快捷的获取state
export const useTestSelector = createSelectorHook<typeof initialState>(name)