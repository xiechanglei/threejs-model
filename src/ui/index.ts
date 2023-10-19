import {initStyledConfig} from 'styled-px2vw-plugin'
import "./reset.css"
import "./font/font.css"

//http://view.jqueryfuns.com/2023/3/6/499645bc04e396f0b7bf573bdbe46f0d/ui-buttons.html
const windowWidth = document.body.clientWidth
// initStyledConfig({viewportWidth: windowWidth, ignoreAttrs: []})
const ignoreAttrs = ["font-size"]
const viewportWidth = windowWidth < 1366 ? 750 : 1920
initStyledConfig({viewportWidth, ignoreAttrs})

