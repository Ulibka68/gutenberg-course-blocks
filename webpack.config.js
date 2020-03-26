const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    function isDevelopment() {
        return argv.mode === "development";
    }
    var config = {
        entry: {
            editor: "./src/editor.js",
            script: "./src/script.js",
            editor_script: "./src/editor_script.js"
        },
        output: {
            filename: "[name].js"
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        map: {
                            inline: false,
                            annotation: true
                        }
                    }
                })
            ]
        },
        plugins: [
            new CleanWebpackPlugin({
                // Write Logs to Console
                verbose: true,
            }),
            new MiniCssExtractPlugin({
                chunkFilename: '[id].css',
                moduleFilename: (chunk) => {
                  const { name } = chunk;
                  return   name === "script" ? "style.css" : "[name].css";
                }
              })
        ],
        devtool: isDevelopment() ? "cheap-module-source-map" : "source-map",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                plugins: [
                                    "@babel/plugin-proposal-class-properties"
                                ],
                                presets: [
                                    "@babel/preset-env",
                                    [
                                        "@babel/preset-react",
                                        {
                                            pragma: "wp.element.createElement",
                                            pragmaFrag: "wp.element.Fragment",
                                            development: isDevelopment()
                                        }
                                    ]
                                ]
                            }
                        },
                        "eslint-loader"
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [autoprefixer()]
                            }
                        },
                     
                        "sass-loader"
                    ]
                }
            ]
        },
        externals: {
            jquery: "jQuery",
            lodash: "lodash",
            "@wordpress/blocks": ["wp", "blocks"],
            "@wordpress/i18n": ["wp", "i18n"],
            // "@wordpress/editor": ["wp", "editor"],
            "@wordpress/block-editor": ["wp", "blockEditor"],
            "@wordpress/components": ["wp", "components"],
            "@wordpress/element": ["wp", "element"],
            "@wordpress/blob": ["wp", "blob"],
            "@wordpress/data": ["wp", "data"],
            "@wordpress/html-entities": ["wp", "htmlEntities"],
            "@wordpress/compose": ["wp", "compose"],
            "@wordpress/plugins": ["wp", "plugins"],
            "@wordpress/edit-post": ["wp", "editPost"]
        }
    };
    return config;
};
