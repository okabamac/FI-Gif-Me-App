const path = require("path");
const webpack = require("webpack");
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`mode is: ${mode}`);
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  return {
    mode,
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(envKeys)
    ],
    watch: true,
    // Development Tools (Map Errors To Source File)
    devtool: 'source-map',
    devServer: {
      hot: true,
      open: true,
      port: 3000,
    }
  }
};
