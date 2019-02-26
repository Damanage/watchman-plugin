const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './app/index.ts',
    mbg: './app/MonitoringBackground2.ts',
    content: './app/watchmanContent.ts'
  },
  plugins: [
    new CopyPlugin([
      { from: 'app/css', to: 'css'},
      { from: 'app/Lib', to: 'Lib'},
      { from: 'app/index.html'},
      { from: 'app/manifest.json'},
      { from: 'app/logo.png'},
      { from: 'app/logo128x128.png'},
    ]),
    new CleanWebpackPlugin(['dist/*']),
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      { 
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/ 
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js' ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};