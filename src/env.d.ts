/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue-demi";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module "*.md" {
  import { DefineComponent } from "vue-demi";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.bpmnlintrc" {
  const rc: any;
  export default rc;
}

declare module "rollup-plugin-bpmnlint" {
  import { Plugin } from "rollup";
  const bpmnlint: () => Plugin;
  export default bpmnlint;
}
