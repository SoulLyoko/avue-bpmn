# BpmnModeler

::: tip
示例代码由于文档 ssr 的问题,导致组件的写法有些奇怪,使用时按照正常的写法(注释的代码)即可.
:::

## Basic

::: demo
./basic
:::

## Update Options

::: demo
./update
:::

## Custom Options

::: demo
./custom
:::

## Props

| 属性                                           | 说明                                                      | 类型            | 可选值                                    | 默认值                        |
| ---------------------------------------------- | --------------------------------------------------------- | --------------- | ----------------------------------------- | ----------------------------- |
| v-model                                        | 表单绑定值                                                | Object          | -                                         | -                             |
| v-model:xml(Vue3) <br/> xml.sync(Vue2)         | 导入的 xml 字符串,不传或传空创建新图形,修改属性值自动更新 | string          | -                                         | -                             |
| v-model:modeler(Vue3) <br/> modeler.sync(Vue2) | 初始化实例                                                | Modeler         | -                                         | -                             |
| v-model:element(Vue3) <br/> element.sync(Vue2) | 每次点击图形更新                                          | Base            | -                                         | -                             |
| prefix                                         | 前缀                                                      | string          | "activiti", "camunda", "flowable", "bpmn" | "bpmn"                        |
| size                                           | 参照 element-plus(Vue3) 或 element-ui(Vue2) 的组件大小    | string          |                                           | "default"(Vue3),"small"(Vue2) |
| formWidth                                      | 表单宽度                                                  | string          | -                                         | "30%"                         |
| formOptions                                    | 表单配置                                                  | BpmnFormOptions | -                                         |                               |
| initOptions                                    | 初始化配置                                                | ViewerOptions   | -                                         |                               |

## Slot

| 插槽名      | 说明                                                     |
| ----------- | -------------------------------------------------------- |
| bpmn-tools  | 自定义顶部工具栏,插入到默认工具栏项之后                  |
| 表单项 prop | 自定义表单项,参照[avue](https://avuejs.com/)的表单自定义 |

## Type Definition

<<< @/types/bpmn.ts#BpmnTypes{0}
