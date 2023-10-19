import {ThreeContainer} from "./style";
import {useAsyncMount} from "@/common/react.hooks.ts"
import {Space} from "@/common/three/Space"
// import glbfile from "@/models/hourse.glb"
import glbfile from "@/models/d.glb"
// import {test} from "@/models/test.ts";


export const Welcome = () => {
    useAsyncMount(async () => {
        const element = document.getElementById("three-wrapper")
        if (element !== null) {
            const space = new Space(10, 10)
            space.render(element)
            await space.addModel(glbfile,10)
            // test(element)
        }
    })
    return <ThreeContainer id="three-wrapper"></ThreeContainer>
}

export default Welcome