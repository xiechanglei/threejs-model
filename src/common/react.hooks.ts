import {EffectCallback, useEffect} from "react";

/**
 * 很多时候，需要一个组件挂载之后的事件，基本上依赖的变化都是[],那么这里就定义一个通用的hook用来完成这样的事情
 */
export const useMount = (func: EffectCallback) => {
    useEffect(func, [])
}

export const useAsyncMount = (func: () => Promise<unknown>) => {
    useEffect(() => {
        func()
    }, [])
}