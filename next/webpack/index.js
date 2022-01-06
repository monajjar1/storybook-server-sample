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

const walk = (dir) => {
    var results = [];
    fs.readdirSync(dir).forEach(file=>{
      file = dir + '/' + file;
      var fileStat = fs.statSync(file);
      if(fileStat && fileStat.isDirectory()) {
        results = results.concat(walk(file));
      }else if(file && (file.endsWith('.js') || file.endsWith('.ts')) ) {
        results.push(file);
      }
    });
    return results;
  };


const configs = {
  entry: () =>
    new Promise((resolve) => {
      const files = {};
      const dir = walk(path.resolve(__dirname, "gen"));
      dir.forEach((item) => {
        const relativePath = path.relative( path.resolve(__dirname, "..",), item );
        const splitted = relativePath.split('/');
        const fileName = splitted.slice(2,splitted.length).join('/');
        files[fileName.replace(/\.?js$/, "")] = `./${relativePath}`;
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
