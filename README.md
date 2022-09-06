<div align="center">
<h3>AvueBpmn</h3>
<span>Configurable bpmnjs vue components</span> 
<br>
<a href="https://soullyoko.github.io/avue-bpmn/">Docs</a>
</div>

## Install

```bash
npm i avue-bpmn
# or
yarn add avue-bpmn
```

## Usage

### Full Import

```ts
import { createApp } from "vue";
import App from "./App.vue";
import AvueBpmn from "avue-bpmn";
import "avue-bpmn/dist/index.css";

const app = createApp(App);
app.use(AvueBpmn);
app.mount("#app");
```

### Manually import

```html
<!-- App.vue -->
<template>
  <BpmnModeler></BpmnModeler>
</template>
<script setup>
  import { BpmnModeler } from "avue-bpmn";
  import "avue-bpmn/es/styles/bpmn-modeler.css";
</script>
```

### Volar Support

Add the global component type definition for `Volar`

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["avue-bpmn/global"]
  }
}
```
