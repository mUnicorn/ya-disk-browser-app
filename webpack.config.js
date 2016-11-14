const Path = require("path"),
    Webpack = require("webpack"),
    HTMLPlugin = require('html-webpack-plugin'),

    sourcePath = Path.join(__dirname, "source"),
    destinationPath = Path.join(__dirname, "release"),
    mainFileName = "main.jsx";

module.exports = {
    entry: {
        main: Path.join(sourcePath, mainFileName)
    },

    output: {
        path: destinationPath,
        filename: "[name].bundle.js"
    },

    resolve: {
        root: sourcePath
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }, {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: "json-loader"
            }
        ]
    },

    plugins: [
        new Webpack.ProvidePlugin({
            React: "react",
            ReactDOM: "react-dom"
        }),

        new HTMLPlugin({
            inject: true,
			template:  Path.join(sourcePath, "index.html")
        })
    ],

    debug: true,
    devtool: "source-map",
    devServer: {
		contentBase: destinationPath,
		historyApiFallback: true,
		port: 3000
	}
};
