import type { App } from "vue-demi";
import type { Theme } from "vitepress";
import defaultTheme from "vitepress/theme";
import AvueBpmn from "../..";
import "../../styles/index.scss";
import components from "../components";

export default {
  ...defaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(AvueBpmn);
    app.use(components);
  }
} as Theme;
