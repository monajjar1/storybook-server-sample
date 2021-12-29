require("ignore-styles");

require("@babel/register")({
  ignore: [/(node_module)/],
  presets: ["@babel/preset-env"],
});


const webpack = require("./webpack");

module.exports = webpack;


