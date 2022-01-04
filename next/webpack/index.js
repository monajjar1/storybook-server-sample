import path from "path";
import webpack from "webpack";
import fs from "fs";

import { rules as styles, plugins as stylePlugins } from "./modules/styles";
import { rules as scripts } from "./modules/scripts";
import optimizations from "./optimizations";
import ReactAppGeneratorPlugin from "./plugins/react-app-generator-plugin";

let rules = [...styles, ...scripts];

let plugins = [
  new webpack.DefinePlugin({
    "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH),
  }),
  new webpack.ProvidePlugin({
    React: "react",
  }),

  ...stylePlugins,
];

if (process.env.NODE_ENV !== "production") {
  plugins.push(new ReactAppGeneratorPlugin());
}

const ASSET_PATH = process.env.ASSET_PATH || "/";

const configs = {
  entry: () =>
    new Promise((resolve) => {
      const files = {};
      fs.readdirSync(path.resolve(__dirname, "gen")).forEach((item) => {
        files[item.replace(/\.?js$/, "")] = `./webpack/gen/${item}`;
      });
      resolve(files);
    }),
  output: {
    filename:
      process.env.NODE_ENV === "production"
        ? "js/[name].build.[chunkhash].js"
        : "js/[name].build.js",
    path: path.resolve(__dirname, "..", "build"),
    clean: true,
    publicPath: ASSET_PATH,
  },
  devServer: {
    static: "./build",
    hot: true,
  },
  module: {
    rules,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins,
  optimization: optimizations,
};

export default configs;
