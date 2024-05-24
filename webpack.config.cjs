const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/load_modules.mjs',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src/lib'),
  },
};
