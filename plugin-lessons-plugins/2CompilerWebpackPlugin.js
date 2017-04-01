/**
 * @typedef {CompilerParams} params holds the default module factories as well as compilationDependencies, this is used in "compile" and "before-compile", "compilation", and "this-compilation" hooks.
 * @type {Object} 
 * @property {NormalModuleFactory} normalModuleFactory - The NFM that you use here is configured, 
 * @property {ContextModuleFactory} contextModuleFactory -The CMF that you use here is configured, you can write a plugin and apply it here. 
 * @property {any[]} compilationDependencies - compilationDependencies contain fileDependencies that are created during compilation.
 */

/**
 * Just some custom plugin utility(s) I wrote.
 */
const pluginUtils = require("./plugin-utils");

/**
 * 
 * @class CompilerWebpackPlugin - This is a example of a webpack plugin using `class`. The most common and easy to understand syntax
 * 
 */
class CompilerWebpackPlugin {
    /**
     * @description Creates an instance of CompilerWebpackPlugin.
     * @param {object} options - Adds options from your configuration 
     * into the plugin for additional functionality
     * 
     * @memberOf CompilerWebpackPlugin
     */
    constructor({message}) {
        this.message = message;
    }
    /**
     * @name apply
     * @description This method is invoked by the Compiler on "registration" and 
     * an instance of the Compiler is passed in as a parameter. 
     * @param {Compiler} compiler - This is the Compiler instance. AKA "Webacpk Central Dispatch"
     * 
     * @memberOf CompilerWebpackPlugin
     * 
     */
    apply(compiler) {
        /**
         * @param {CompilerParams} params - params holds the default module factories as well 
         * as compilation dependencies in a single object
         * @param {Function} callback - callback to inform the compiler to continue
         * @description "before-compile" - This purpose of this hook is to perform functionality before the `compiler` hook has executed and is run. 
         * Examples of things that are done within webpack source for this hook include storing files (See DllReferencePlugin:22). 
         * 
         */
        compiler.plugin("before-compile", (params, callback) => {
            const {normalModuleFactory, contextModuleFactory} = params;
            const foo = "DO SOMETHING AND SET IT UP BEFORE COMPILE STEP";
            params.foo = foo;

            pluginUtils.logPluginEvent(`compiler:before-compile:Param Added:Params: -- ${Object.keys(params)}`, "CompilerWebpackPlugin", "bgGreen", "magenta", "white");

            callback();
        });


        /**
         * @param {CompilerParams} params - params holds the default module factories as well as compilation dependencies in a single object
         * @description "compile" - This hook fires immediately after "compile", and also has access to params.  
         * webpack itself leverages `compiler.plugin("compile"` to decorate the NormalModuleFactory to add 2-3 additional module factories (dll, delegated, etc.) See (ExternalsPlugin.js:15, DelegatedPlugin.js:21); This supports additional 
         * module types like `ExternalsModule` and `DllModule` and `DelegatedModule`
         * 
         */
        compiler.plugin("compile", (params) => { 
            const {foo} = params;

            // For now in this example 
            // I'm going to just show how to use params 
            // that were set from before compile. 
            // Simple right?
            pluginUtils.logPluginEvent(`compiler:compile:ExtractedNewParam:Foo:${foo}`, "CompilerWebpackPlugin", "bgGreen", "magenta", "white");
        });

        /**
         * @param {Compilation} compilation - params holds the default module factories as well 
         * @param {CompilerParams} params (see @typedef)
         * @description "this-compilation" there is 1 very subtle difference between these two hooks. Compared to "compilation" which is the single overarching parent compilation returned from the 1 compiler instance, `this-compilation` can be the product of childCompilers's compilations (aka child compilations). The `this-compilation` is like saying "each-compilation". Any time you plugin to "this-copmilation" you will see this hook potentially execute multiple times (dependending on what other plugins are being used in your configuration).
         * 
         */
        compiler.plugin("this-compilation", (compilation, params) => {
            pluginUtils.logPluginEvent("compiler:this-compilation", "CompilerWebpackPlugin", "bgRed", "white", "white");
        });
        
        /**
         * @param {Compilation} compilation - params holds the default module factories as well 
         * @param {CompilerParams} params (see @typedef)
         * @description "compilation" - represents the entire dep graph traversing, factory module creation, request resolving, chunk creation, super center. There are so many hooks on the compilation that I want to save it for a separate lesson. But for now we can use the example below to just access a piece of information on the Compilation object itself and console log it. 
         * 
         */        
        compiler.plugin("compilation", (compilation, params) => {
            pluginUtils.logPluginEvent(`compiler:compilation:compilation:inputFileSystem = ${compilation.inputFileSystem}`, "CompilerWebpackPlugin", "bgRed", "white", "white");
        });


        compiler.plugin("normal-module-factory", (normalModuleFactory) => {

        });

        compiler.plugin("context-module-factory", (contextModuleFactory) => {
            
        });

        compiler.plugin("make", (compilation, callback) => {

            callback();
        });

        compiler.plugin("after-compile", (compilation, callback) => {

            callback();
        });
    }
}


module.exports = CompilerWebpackPlugin;