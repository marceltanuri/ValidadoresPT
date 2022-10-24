const path = require('path');

module.exports = {
    module: {
        rules: [
            {
              test: /\.css$/i,
              use: ["style-loader", "css-loader"],
            },
          ]
    },
    entry: './index.js',
    output: {
        filename: 'validadores-pt.min.js',
        path: path.resolve(__dirname, 'dist/js'),
        libraryTarget: "var",
        library: "ValidadoresPT",
    }
};