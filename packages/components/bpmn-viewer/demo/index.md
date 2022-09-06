# BpmnViewer

::: tip
示例中的样式文件正确用法是 `import "avue-bpmn/es/styles/bpmn-viewer.css"`
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
