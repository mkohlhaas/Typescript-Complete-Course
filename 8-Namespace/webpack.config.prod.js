const path = require('path');
const cleanPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',                          /* Changed */
  entry: './src/app.ts',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: "/dist/",                   /* Changed */
  },
  // devtool: 'inline-source-map',            /* Changed */
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './'),
    }
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [                                   /* Changed */
    new cleanPlugin.CleanWebpackPlugin()
  ]
};
