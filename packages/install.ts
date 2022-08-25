import type { App, Plugin, Component } from "vue-demi";

import components from "./components";

export default {
  install(app: App) {
    Object.values(components).forEach((component: Component) => {
      app.component(component.name!, component);
    });
  }
} as unknown as Plugin;
