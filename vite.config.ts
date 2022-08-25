import path from "path";

import { defineConfig } from "vite";
import fs from "fs-extra";

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
    // vue: "Vue",
    // "vue-demi": "VueDemi",
    // "@vueuse/core": "VueUse",
    // "lodash-es": "_",
    // "lodash-unified": "_",
    // lodash: "_",
    // "bpmn-js": "BpmnJs",
    // "diagram-js": "DiagramJs",
    // "file-saver": "FileSaver"
  };
  const external = Object.keys(globals);
  if (mode === "production") {
    fs.removeSync("dist");
    fs.removeSync("es");
    fs.removeSync("lib");
  }
  return {
    plugins: [vuePlugin],
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
      // exclude: mode === "production" ? external : []
      // exclude: ["vue-demi"]
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
