import { defineConfig } from 'father';

export default defineConfig({
  esm: {},
  umd: {
    name: "dialog",
    output: {
      filename: "index.js",
    },
    externals: {
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "react",
        root: "React",
      },
    },
  },
});
