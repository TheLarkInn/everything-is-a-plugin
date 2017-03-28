/**
 * Just some custom plugin utility(s) I wrote.
 */
const pluginUtils = require("./plugin-utils");

/**
 * @class BasicPlugin - This is a example of a webpack plugin using `class`. The most common and easy to understand syntax
 */
class BasicPlugin {
    /**
     * @description Creates an instance of BasicPlugin.
     * @param {object} options - Adds options from your configuration into the plugin for additional functionality
     * 
     * @memberOf BasicPlugin
     */
    constructor({message}) {
        this.message = message;
    }
    /**
     * @name apply
     * @description This method is invoked by the Compiler on "registration" and an instance of the Compiler is passed in as a parameter. 
     * @param {Compiler} compiler - This is the Compiler instance. Calling `compiler.plugin('some-event', (someState) => {})` allows one to "plug into" 
     * the compiler and listen to events and update state/add side effects or perform additional functionality through the compiler/compilation life cycle
     * 
     * @memberOf BasicPlugin
     */
    apply(compiler) {
        compiler.plugin(["run", "watch-run"], (compiler, callback) => {
            pluginUtils.logPluginEvent(`${this.message}`, "BasicPlugin");
            callback();
        });
    }
}

module.exports = BasicPlugin;