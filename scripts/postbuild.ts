import { execSync } from "child_process";

import fs from "fs-extra";
import { series, src, dest } from "gulp";
import autoprefixer from "gulp-autoprefixer";
import cleancss from "gulp-clean-css";
import gulpSass from "gulp-sass";
import sass from "sass";

function buildTypes() {
  console.log("Building types...");
  const run = outDir =>
    execSync(`vue-tsc -p tsconfig.${outDir}.json -d --emitDeclarationOnly && tsc-alias -p tsconfig.${outDir}.json`);
  run("es");
  run("lib");
}
function buildStyles() {
  console.log("Building styles...");
  const common = () =>
    src("packages/**/*.scss")
      .pipe(gulpSass(sass).sync())
      .pipe(autoprefixer())
      .pipe(cleancss({ inline: ["none"] }));
  const task1 = () => common().pipe(dest("es"));
  const task2 = () => common().pipe(dest("lib"));
  series(task1, task2)(err => !err && copyStyle());
}
function copyStyle() {
  fs.copySync("lib/styles/index.css", "dist/index.css");
}
function buildGlobal() {
  execSync("yarn build:global");
}

buildTypes();
buildStyles();
buildGlobal();
