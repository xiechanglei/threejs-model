# React模板项目,方便后续小的程序开发，省的每次都架构一遍

#### 使用技术架构

- react
- axios
- styled-components
- styled-px2vw-plugin
- react-router
- redux

#### 特性功能

##### 1. log美化

```javascript
import {log} from "@/common/log"

log("TAG", "content1", "content2")
```

##### 2.消息通知

```javascript
import {notify} from "@/components/NotificationCenter/notificationHandler"

notify("start app success")
```

##### 3.样式插槽

```javascript
import {flex} from "@/ui/layout"

const Container = styled.div`
  ${flex("column", "center", "center")}
`
```

##### 4.默认的ui组件

```javascript
import {Button} from "@/ui/button"
```

##### 5.主题颜色

```javascript
import {primaryColor, successColor} from "@/ui/color"
```

##### 6.图标
```javascript
import {SuccessIcon} from "@/ui/icon"
```