import webpack from 'webpack'

export default {
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components']
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
  context: __dirname,
  entry: `../test/test.js`,
  output: {
    path: `./tmp`,
    filename: '_test_bundle.js'
  }
}

