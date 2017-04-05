/**
 * Just some custom plugin utility(s) I wrote.
 */
const pluginUtils = require("./plugin-utils");
const WebpackSources = require("webpack-sources");

/**
 * @class TemplatePlugin - This is a example of a webpack plugin using `class`. The most common and easy to understand syntax
 */
class TemplatePlugin {
    /**
     * @description Creates an instance of TemplatePlugin.
     * @param {object} options - Adds options from your configuration into the plugin for additional functionality
     * 
     * @memberOf TemplatePlugin
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
     * @memberOf TemplatePlugin
     */
    apply(compiler) {
        compiler.plugin("compilation", (compilation, callback) => {
            compilation.moduleTemplate.plugin("render", (moduleSource, module) => {
                pluginUtils.logPluginEvent(`Inside ModuleTemplate Render Fn\n This is the src: ${moduleSource}`, "TemplatePlugin", "bgGreen", "white", "white");
                console.log(moduleSource);
                return moduleSource;
            });
            compilation.moduleTemplate.plugin("package", (moduleSource, module) => {
                pluginUtils.logPluginEvent(`Inside ModuleTemplate Render Fn\n This is the src: ${moduleSource}`, "TemplatePlugin", "bgGreen", "white", "white"); 
                console.log(moduleSource);               
                return moduleSource;
            });
            // compilation.moduleTemplate.plugin("hash", (hash) => {
            //     hash.update("TemplatePlugin");
            //     hash.update(2);
            // });
        });
    }
}

module.exports = TemplatePlugin;