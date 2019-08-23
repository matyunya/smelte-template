import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import getPreprocessor from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

const preprocess = getPreprocessor({
  transformers: {
    postcss: {
      plugins: require("./postcss.config.js")()
    }
  }
});

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle.js"
  },
  plugins: [
    svelte({
      preprocess,
      // enable run-time checks when not in production
      dev: !production,
      css: css => {
        css.write("public/components.css");
      }
    }),
    postcss({
      plugins: require("./postcss.config.js")(production),
      extract: "public/utils.css"
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({ browser: true }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
