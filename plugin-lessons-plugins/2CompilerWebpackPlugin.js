/**
 * Just some custom plugin utility(s) I wrote.
 */
const pluginUtils = require("./plugin-utils");
const chalk = require("chalk");

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
        /**
         * @param {Compiler} compiler - The Compiler Instance (self)
         * @param {Function} callback - callback which signals the hook is finished and that webpack can continue to next compilation step ()
         * @description "before-run" - Runs before the compiler begins any compilation process. 
         *
         */
        compiler.plugin("before-run", (compiler, callback) => {
            pluginUtils.logPluginEvent("compiler:before-run", "CompilerWebpackPlugin", "bgMagenta");
            callback();
        });

        compiler.plugin(["run", "watch-run"], (compiler, callback) => {            
            pluginUtils.logPluginEvent(`${this.message}`, "CompilerWebpackPlugin");
            callback();
        });

        compiler.plugin("failed", (error) => {
            pluginUtils.logPluginEvent("compiler:failed","CompilerWebpackPlugin", "bgRed");
        });

        compiler.plugin("done", (stats/*: Stats*/) => {
            // console.log(stats); <=== always keep a console.log or node inspector handy so you can follow the flow of source through the plugin system.
            // debugger <= The "done" event ssends to parent top ctrl,
            const moduleString = stats.toJson().modules.map(module => module.identifier).join(`\n`);

            pluginUtils.logPluginEvent(`compiler:done\n${moduleString}`, "CompilerWebpackPlugin", "bgGreen");
        });
    }
}


module.exports = CompilerWebpackPlugin;