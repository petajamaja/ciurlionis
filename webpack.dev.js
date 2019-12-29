const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 8080,
        host: `localhost`,
        watchContentBase: true
    },
    entry: {
        index: [
            './src/index.js'
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        modules: [
          'node_modules'
        ]        
    },
    module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          inject: true,
          chunks: ['index'],
          filename: 'index.html'
        })
    ]

};