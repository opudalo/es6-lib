"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var webpack = _interopRequire(require("webpack"));

module.exports = {
  resolve: {
    modulesDirectories: ["node_modules", "bower_components"]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: "babel-loader?blacklist=strict"
    }]
  },
  plugins: [new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"]))],
  context: __dirname,
  entry: "../test/test.js",
  output: {
    path: "./tmp/_test_bundle",
    filename: "bundle.js"
  }
};