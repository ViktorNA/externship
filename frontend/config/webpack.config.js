const path = require("path");
const HWP = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
   entry: path.join(__dirname, "../src/index.jsx"),
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000,
      historyApiFallback: true
    },
   output: {
       filename: "build.js",
       path: path.join(__dirname, "/dist"),
       publicPath: "/"
   },
       
  plugins:[
      new HWP(
          {template: path.join(__dirname,"../src/index.html")}
      ),
      new webpack.LoaderOptionsPlugin({
        options: {
          loaders: [
            {exclude: ['node_modules'], loader: 'babel', test: /\.jsx?$/},
            {loader: 'style-loader!css-loader', test: /\.css$/},
            {loader: 'url-loader', test: /\.gif$/},
            {loader: 'file-loader', test: /\.(ttf|eot|svg)$/},
          ],
        }
      })
  ],
   resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
   module:{
       rules:[{
         test: /\.jsx$/,
          exclude: /node_modules/,
          loader: "babel-loader"
       },
         {
           test: /\.css$/i,
           use: ["style-loader", "css-loader"],
         },
            {
                test: /\.scss$/,
                use: [
                {
                    loader: "style-loader"
                },
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                        modules: true,
                        modules: {
                            localIdentName: "[local]_[hash:base64:5]",
                        }
                    }
                },
                {
                    loader: "sass-loader"
                }
                ]
            },

         {
           test: /\.(svg|png|gif|jpe?g)$/,
           use: [
             {
               loader: 'file-loader',
               options: {
                 name: '[path][name].[ext]',
               },
             },
             'img-loader',
           ],
         },
         {
           test: /\.(ttf|eot|woff|woff2)$/,
           loader: 'file-loader',
           options: {
             name: 'fonts/[name].[ext]'
           }
         }
    ]
   },
};
