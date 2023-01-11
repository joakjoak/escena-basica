const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  //...
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js",
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "/src"),
    },
    client: {
      logging: "info",
    },
    compress: true,
    open: true,
    port: 5000,
    https: true,
  },
};
