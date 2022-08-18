const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { InjectManifest } = require('workbox-webpack-plugin')
const path = require('path')

module.exports = () => {
    return {
        mode: "development",
        entry: {
            main: ".src/js/index.js",
            install: "src/js/install.js"
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
        },
        plugin: [
            new HtmlWebpackPlugin({
                template: "./index.html",
                title: "JSTE"
            }),
            new InjectManifest({
                swSrc: "./src/src-sw.js",
                swDest: "./dist/service-worker.js"
            }),
            new WebpackPwaManifest({
                fingerprints: false,
                inject: true,
                name: 'JS-Text-Editor',
                short_name: 'JSTE',
                description: 'Java Script Text Editor!',
                background_color: '#362ca4',
                theme_color: '#571ca1',
                start_url: '/',
                publicPath: '/',
                icons: [
                  {
                    src: path.resolve('src/images/logo.png'),
                    sizes: [96, 128, 192, 256, 384, 512],
                    destination: path.join('assets', 'icons'),
                  },
                ]
            })
        ],

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
                      },
                    }
                }
            ]
        }
    }
}