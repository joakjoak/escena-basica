const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const stylesRules = {
  test: /\.(css|scss|sass)$/,
  use: [MiniCssExtractPlugin.loader, "css-loader"],
  generator: {
    filename: ({ filename }) => {
      if (filename.includes("source")) {
        return filename.replace("source", "dist");
      }
      if (filename.includes("node_modules")) {
        return filename.replace("node_modules", "dist");
      }
      return filename;
    },
  },
};

const htmlRules = {
  test: /\.html$/,
  use: ["html-loader"],
};

const imagesRules = {
  type: "asset",
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  generator: {
    filename: ({ filename }) => {
      if (filename.includes("source")) {
        return filename.replace("source", "dist");
      }
      if (filename.includes("node_modules")) {
        return filename.replace("node_modules", "dist");
      }

      return filename;
    },
  },
};

module.exports = {
  //...
  entry: {
    index: "./src/pow/index.js",
    sphere: "./src/pow/sphere.js",
    spherevid: "./src/pow/spherevid.js",
    objscene: "./src/pow/objScene.js",
    exterior: "./src/pow/exterior.js",
  },
  output: {
    filename: "./javascripts/[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name][ext]",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "sphere.html",
      template: "./src/sphere.html",
      chunks: ["sphere"],
    }),
    new HtmlWebpackPlugin({
      filename: "spherevid.html",
      template: "./src/spherevid.html",
      chunks: ["spherevid"],
    }),
    new HtmlWebpackPlugin({
      filename: "objscene.html",
      template: "./src/objscene.html",
      chunks: ["objscene"],
    }),
    new HtmlWebpackPlugin({
      filename: "exterior.html",
      template: "./src/exterior.html",
      chunks: ["exterior"],
    }),

    new MiniCssExtractPlugin({
      filename: "./stylesheets/[name].css",
    }),
  ],
  module: {
    rules: [
      stylesRules,
      htmlRules,
      imagesRules,
      //  obfRules
    ],
  },
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
