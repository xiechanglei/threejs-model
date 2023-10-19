import {createHashRouter, RouteObject} from "react-router-dom"
import {ErrorPage} from "@/pages/ErrorPage"
import {lazyRouter} from "./routerHandler"

const routerOptions: RouteObject[] = [{
    path: "/",
    lazy: () => lazyRouter(import("@/pages/Welcome")),
    errorElement: <ErrorPage/>
}]

export const router = createHashRouter(routerOptions)