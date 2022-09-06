# BpmnViewer

::: tip
示例代码由于文档 ssr 的问题,导致组件的写法有些奇怪,使用时按照正常的写法(注释的代码)即可.
:::

## Basic

::: demo
./basic
:::

## Props

| 属性        | 说明                         | 类型          | 可选值 | 默认值 |
| ----------- | ---------------------------- | ------------- | ------ | ------ |
| xml         | 导入的 xml 字符串            | string        | -      | -      |
| data        | 为每个节点添加颜色和文本提示 | ViewerData[]  | -      | -      |
| initOptions | 初始化配置                   | ViewerOptions | -      |        |

## Type Definition

<<< @/components/bpmn-viewer/src/index.ts#ViewerData{0}
