import {useDispatch, useSelector} from "react-redux"

export function creatActionsHook<T extends string>(actions: { [key in T]: (...args: any) => any }) {
    return () => {
        const dispatch = useDispatch()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const dispatchActions: { [key in T]: (...args: any) => void } = {}
        const keys: Array<T> = Object.keys(actions) as Array<T>
        keys.forEach((key) => {
            dispatchActions[key] = (...args: any) => {
                dispatch(actions[key](...args))
            }
        })
        return dispatchActions
    }
}

export function createNoParamActionsHook<T extends string>(actions: { [key in T]: (...args: any) => any }) {
    return () => {
        const dispatch = useDispatch()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const dispatchActions: { [key in T]: () => void } = {}
        const keys: Array<T> = Object.keys(actions) as Array<T>
        keys.forEach((key) => {
            dispatchActions[key] = () => {
                dispatch(actions[key]())
            }
        })
        return dispatchActions
    }
}


export function createSelectorHook<T>(name: string) {
    return (selector: (t: T) => any = t => t) => {
        return useSelector((state: any) => selector(state[name]))
    }
}