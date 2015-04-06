"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var webpack = _interopRequire(require("webpack"));

var path = _interopRequire(require("path"));

module.exports = function (rootDir) {
  return {
    resolve: {
      modulesDirectories: ["node_modules", "bower_components"]
    },
    resolveLoader: {
      root: path.join(__dirname, "../node_modules")
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: "babel-loader?blacklist=strict"
      }]
    },
    plugins: [new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"]))],
    entry: "" + rootDir + "/test/test.js",
    output: {
      path: "" + rootDir + "/dist",
      filename: "_test_bundle.js"
    }
  };
};