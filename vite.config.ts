import path from "path";

import { defineConfig } from "vite";
import fs from "fs-extra";
import { isVue2 } from "vue-demi";
import bpmnlint from "rollup-plugin-bpmnlint";

import pkg from "./package.json";
import { getVueVersion } from "./scripts/utils";

// https://vitejs.dev/config/e
export default defineConfig(async ({ mode }) => {
  const vuePluginMap = {
    2: async () => (await import("vite-plugin-vue2")).createVuePlugin(),
    2.7: async () => (await import("@vitejs/plugin-vue2")).default(),
    3: async () => (await import("@vitejs/plugin-vue")).default()
  };
  const vuePlugin = await vuePluginMap[getVueVersion()]();
  const globals = {
    vue: "Vue",
    "vue-demi": "VueDemi",
    lodash: "_",
    "lodash-es": "_",
    "lodash-unified": "_",
    "bpmn-js/lib/Modeler": "BpmnJS",
    "bpmn-js-token-simulation": "BpmnJSTokenSimulation",
    "bpmn-js-bpmnlint": "BpmnJSBpmnlint",
    "diagram-js-minimap": "DiagramJSMinimap",
    "file-saver": "FileSaver"
  };
  const external = Object.keys(globals);
  if (mode === "production") {
    fs.removeSync("dist");
    fs.removeSync("es");
    fs.removeSync("lib");
  }
  return {
    plugins: [vuePlugin, bpmnlint()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "~": path.resolve(__dirname, "packages"),
        [pkg.name]: path.resolve(__dirname, "packages")
      }
    },
    test: {
      globals: true,
      environment: "jsdom"
    },
    optimizeDeps: {
      exclude: mode === "production" ? external : [isVue2 ? "element-plus" : "element-ui"]
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, "packages/index.ts"),
        name: pkg.upperName
      },
      rollupOptions: {
        external,
        output: [
          {
            globals,
            entryFileNames: "[name].js",
            format: "umd",
            dir: "dist"
          },
          {
            preserveModules: true,
            preserveModulesRoot: path.resolve(__dirname, "es"),
            entryFileNames: "[name].js",
            format: "es",
            dir: "es"
          },
          {
            exports: "named",
            preserveModules: true,
            preserveModulesRoot: path.resolve(__dirname, "lib"),
            entryFileNames: "[name].js",
            format: "cjs",
            dir: "lib"
          }
        ]
      }
    }
  };
});
