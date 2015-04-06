import webpack from 'webpack'
import path from 'path'

export default function (rootDir) {
  return {
    resolve: {
      modulesDirectories: ['node_modules', 'bower_components']
    },
    resolveLoader: {
      root: path.join(__dirname, "../node_modules")
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader?blacklist=strict'
      }]
    },
    plugins: [
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      )
    ],
    entry: `${rootDir}/test/test.js`,
    output: {
      path: `${rootDir}/dist`,
      filename: '_test_bundle.js'
    }
  }
}

