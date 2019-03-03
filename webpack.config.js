const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  // エントリポイントのjsxファイル
  entry: "./src/main.js",

  output: {
    filename: "bundle.js"
    //path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js?$/, // 拡張子がjsで
        exclude: /node_modules/, // node_modulesフォルダ配下は除外
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/react"]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
