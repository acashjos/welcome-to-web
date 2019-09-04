const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');


module.exports = (env, argv) => {

  const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: argv.mode === 'production' ? "../views/index.ejs" : 'index.html'
  });

  return {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    plugins: [htmlPlugin],

    devtool: 'source-map',

    devServer: {
      historyApiFallback: {
        publicPath: "/",
        contentBase: "./public",
        hot: true,
        rewrites: [
          { from: /^.+$/, to: '/' },
        ]
      }
    },
    output: {
      path: path.resolve(__dirname, '../public' /*ifProd('../', 'build')*/),
      publicPath: '/', //ifProd('./public', ''),
      filename: '[name].js' // output bundle.js and vendor.js
    }
  }
};