import {RouterProvider} from "react-router-dom"
import {Provider} from "react-redux"
import {router} from "@/router/router"
import {store} from "@/store"
import {AppWrapper, MarginDisappear, PageContainer} from "./style"


export const App = () => {
    return <AppWrapper>
        <MarginDisappear/>
        <PageContainer>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </PageContainer>
    </AppWrapper>
}
export default App