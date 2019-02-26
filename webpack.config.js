const path = require('path');

module.exports = {
  entry: {
      index: './src/index.js',
      mbg: './src/MonitoringBackground2.js',
      content: './src/watchmanContent.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};