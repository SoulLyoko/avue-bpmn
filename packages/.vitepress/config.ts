import { defineConfig } from "vitepress";
import path from "path";
import bpmnlint from "rollup-plugin-bpmnlint";
import { mdDemoTransform } from "./plugins/md-demo-transform";
import pkg from "../../package.json";

const Guide = [
  { text: "Start", link: "/guide/start" },
  { text: "Changelog", link: "/guide/changelog" }
];
const Components = [
  {
    text: "Components",
    children: [
      { text: "BpmnModeler", link: "/components/bpmn-modeler/demo/index" },
      { text: "BpmnViewer", link: "/components/bpmn-viewer/demo/index" }
    ]
  }
];

export default defineConfig({
  base: `/${pkg.name}/`,
  lang: "zh-CN",
  title: pkg.upperName,
  description: pkg.description,
  themeConfig: {
    docsDir: "packages",
    repo: "SoulLyoko/avue-bpmn",
    nav: [
      { text: "Guide", link: Guide[0].link },
      { text: "Components", link: Components[0].children[0].link }
    ],
    sidebar: {
      "/guide": Guide,
      "/components": Components
    }
  },
  vite: {
    plugins: [mdDemoTransform(), bpmnlint()],
    resolve: {
      alias: {
        "@": path.join(__dirname, "../../src"),
        "~": path.join(__dirname, "../../packages"),
        [pkg.name]: path.resolve(__dirname, "../../packages")
      }
    }
  }
});
