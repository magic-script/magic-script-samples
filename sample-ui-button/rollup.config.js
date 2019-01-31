// Rollup config for consuming some npm modules in MagicScript

import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import executable from "rollup-plugin-executable";

export default {
  external: ["uv", "lumin"],
  input: "src/main.js",
  output: {
    file: "bin/main.js",
    intro: "#!/system/bin/script/mxs\nglobalThis.window=globalThis;",
    format: "es",
    sourcemap: "inline"
  },
  plugins: [resolve(), commonjs(), executable()]
};
