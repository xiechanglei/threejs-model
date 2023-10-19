import {showLog} from "@/config";

const globalTag = "react-app"

export const log = (title: string, ...args: unknown[]) => {
    if (showLog) {
        console.log(
            `%c ${globalTag} %c ${title} %c `,
            'background:#41b883 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
            'background:#35495e ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
            'background:transparent',
            ...args
        )
    }
}

export const error = (title: string, ...args: unknown[]) => {
    if (showLog) {
        console.log(
            `%c ${globalTag} %c ${title} %c `,
            'background:#ff0000 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
            'background:#35495e ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
            'background:transparent',
            ...args
        )
    }
}

/**
 * 隐藏头部的log但是不去除，用于打印请求参数的时候的过滤
 */
export const hideHeaderLog = (title: string, ...args: unknown[]) => {
    if (showLog) {
        console.log(
            `%c ${globalTag} %c ${title}`,
            'color: rgba(0,0,0,0);font-size: 0;',
            'color: rgba(0,0,0,0);font-size: 0;',
            ...args
        )
    }
}