const path = require("path");
const HWP = require("html-webpack-plugin");

module.exports = {
   entry: path.join(__dirname, "../src/index.jsx"),
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000
    },
   output: {
       filename: "build.js",
       path: path.join(__dirname, "/dist")},
       
  plugins:[
      new HWP(
          {template: path.join(__dirname,"../src/index.html")}
      )
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
       }
       ,
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
    ]
   },
} 
