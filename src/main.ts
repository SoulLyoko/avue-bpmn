import { createApp, isVue2 } from "vue-demi";

import App from "./App.vue";

const app = createApp(App);
await setup();
app.mount("#app");

async function setup() {
  if (isVue2) {
    const ElementUI = await import("element-ui");
    import("element-ui/lib/theme-chalk/index.css");
    app.use(ElementUI as any);
    const Avue = await import("@smallwei/avue");
    import("@smallwei/avue/lib/index.css");
    app.use(Avue as any);
  } else {
    const ElementPlus = await import("element-plus");
    import("element-plus/dist/index.css");
    app.use(ElementPlus as any);
    const Avue = await import("@smallwei/avue");
    import("@smallwei/avue/lib/index.css");
    app.use(Avue as any);
  }
}
