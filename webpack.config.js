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
         */
        // new PluginLessonsPlugins.OneBasicPluginWebpackPlugin({message: "Lesson 1 - Learning at ngConf 2017!"}),
        // new PluginLessonsPlugins.TwoCompilerPluginWebpackPlugin({message: "Lesson 2 - The Compiler Instance!"}),
        new PluginLessonsPlugins.ThreeNormalModuleFactoryPlugin({message: "Lesson 3 - The Module Factory Instances!"}),
        new PluginLessonsPlugins.FourResolverPlugin("Lesson 4 - The Resolver Instance")
    ]
}