const path = require("path");
const webpack = require("webpack");

const PluginLessonsPlugins = require("./plugin-lessons-plugins");

module.exports = {
    entry: "./src",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].chunk.js"
    },
    plugins: [
        new webpack.ProgressPlugin(),
        /**
         * Lesson Plan Plugins
         * 
         */
        PluginLessonsPlugins.OneBasicPluginWebpackPlugin("Custom Message")
    ]
}