const chalk = require("chalk");
const pluginUtils = require("./plugin-utils");

class BasicPlugin {
    constructor() {
        pluginUtils.logPluginEvent("pluginDidMount", "BasicPlugin");
        
        /**
         * MINI QUIZ!!! MINI QUIZ!!! MINI QUIZ!!! MINI QUIZ!!! MINI QUIZ!!! MINI QUIZ!!! MINI QUIZ!!! MINI QUIZ!!!
         * 
         * @description - Pass an option "message" into your plugin. Use that message and console.log it when webpack / webpack-dev-server 
         *              - "run"'s or "watch-run"'s
         * 
         * PROTIP: Don't forget to actually pass the message in the plugin in your webpack config!
         * 
         * 
         * MINI QUIZ!!! MINI QUIZ!!! MINI QUIZ!!! MINI QUIZ!!! MINI QUIZ!!! MINI QUIZ!!! MINI QUIZ!!! MINI QUIZ!!!
         */ 
    }

    apply(compiler) {
        compiler.plugin(["run","watch-run"], (compiler, callback) => {

            callback();
        });
    }
}

module.exports = BasicPlugin;