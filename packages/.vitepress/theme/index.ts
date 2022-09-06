import type { App } from "vue-demi";
import type { Theme } from "vitepress";
import defaultTheme from "vitepress/theme";
import components from "../components";
import "./index.scss";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import Avue from "@smallwei/avue";
import "@smallwei/avue/lib/index.css";
// import AvueBpmn from "avue-bpmn";
import "avue-bpmn/styles/index.scss";

export default {
  ...defaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(components);
    app.use(ElementPlus);
    // app.use(Avue);
    app.mixin({
      mounted() {
        import("@smallwei/avue").then(module => {
          app.use(module.default);
        });
        import("avue-bpmn").then(module => {
          app.use(module.default);
        });
      }
    });
  }
} as Theme;
