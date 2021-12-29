import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const rules = [
  {
    test: /\.s[ac]ss|.css$/i,
    use: [
      MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      "css-loader",
      // Compiles Sass to CSS
      {
        loader: "sass-loader",
        options: {
          // Prefer `dart-sass`
          implementation: require("sass"),
          sourceMap: true,
          sassOptions: {
            outputStyle: "compressed",
          },
        },
      },
    ],
  },
];

const settings = {
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: "css/[name].build.[chunkhash].css",
  chunkFilename: "css/[id].build.[chunkhash].css",
  runtime: false,
};
if (process.env.NODE_ENV !== 'production') {
  settings.filename = "css/[name].build.css";
  settings.chunkFilename = "css/[id].build.css";
}
export const plugins = [
  new MiniCssExtractPlugin(settings),
];
