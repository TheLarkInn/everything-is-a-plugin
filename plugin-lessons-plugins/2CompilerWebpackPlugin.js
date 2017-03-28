/**
 * Just some custom plugin utility(s) I wrote.
 */
const pluginUtils = require("./plugin-utils");

/**
 * @class CompilerWebpackPlugin - This is a example of a webpack plugin using `class`. The most common and easy to understand syntax
 */
class CompilerWebpackPlugin {
    /**
     * @description Creates an instance of CompilerWebpackPlugin.
     * @param {object} options - Adds options from your configuration into the plugin for additional functionality
     * 
     * @memberOf CompilerWebpackPlugin
     */
    constructor({message}) {
        this.message = message;
    }
    /**
     * @name apply
     * @description This method is invoked by the Compiler on "registration" and an instance of the Compiler is passed in as a parameter. 
     * @param {Compiler} compiler - This is the Compiler instance. AKA "Webacpk Central Dispatch"
     * 
     * @memberOf CompilerWebpackPlugin
     */
    apply(compiler) {
        compiler.plugin(["run", "watch-run"], (compiler, callback) => {
            pluginUtils.logPluginEvent(`${this.message}`, "CompilerWebpackPlugin");




            
            callback();
        });
    }
}

module.exports = CompilerWebpackPlugin;