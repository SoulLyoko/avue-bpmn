---
title: Start
---

<div align="center">
<h3>AvueBpmn</h3>
<span>A template for building Vue components library</span> 
<br>
<a  href="https://soullyoko.github.io/avue-bpmn/">Docs</a>
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
import "avue-bpmn/lib/style.css";

const app = createApp(App);
app.use(AvueBpmn);
// global config
// app.use(AvueBpmn, { size: "small" });
app.mount("#app");
```

### Manually import

```html
<!-- App.vue -->
<template>
  <v-button>VButton</v-button>
</template>
<script setup>
  import { VButton } from "avue-bpmn";
  import "avue-bpmn/es/styles/button.css";
</script>
```

### On-demand Import

Use unplugin-vue-components to auto import

```bash
yarn add -D unplugin-vue-components
```

```ts
//vite.config.ts
import Components from "unplugin-vue-components/vite";
import { kebabCase } from "unplugin-vue-components";

const LibResolver = componentName => {
  if (componentName.startsWith("V")) {
    const partialName = kebabCase(componentName.slice(1));
    return {
      name: componentName,
      from: "avue-bpmn",
      sideEffects: `avue-bpmn/es/styles/${partialName}.css`
    };
  }
};

export default {
  plugins: [
    // ...
    Components({
      resolvers: [LibResolver]
    })
  ]
};
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
