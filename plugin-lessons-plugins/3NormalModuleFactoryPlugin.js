/**
 * Just some custom plugin utility(s) I wrote.
 */
const path = require("path");
const pluginUtils = require("./plugin-utils");
const BeforeResolveNormalModuleFactoryPlugin = require("./31NMFBeforeResolvePlugin");
const AfterResolveNormalModuleFactoryPlugin = require("./32NMFAfterResolvePlugin");

/**
 * 
 * 
 * @typedef {ResultContextInfo} type for the contextInfo property for BeforeResolveResultParams 
 * @property {String} issuer - the path of module that the request was originated from
 * @property {Compiler} compiler - Compiler instance
 * 
 */

/**
 * @typedef {BeforeResolveResultParams} this is the complex object that gets passed from the normal-module-factory before hooks
 * @property {ResultContextInfo} contextInfo - contextInformation for the result
 * @property {String} context the path in which request was built together to make resolvable and absolute path
 * @property {String} request the actual request the user made in issuer file
 * @property {Dependency[]} dependencies the dependencies that are picked up and added to result as a product of parsing the file
 */

/**
 * 
 * @class NormalModuleFactoryPlugin - This is a example of a webpack plugin using `class`. The most common and easy to understand syntax
 * 
 */
class NormalModuleFactoryPlugin {
    /**
     * @name 
     * @description This method is invoked by the Compiler on "registration" and 
     * an instance of the Compiler is passed in as a parameter. 
     * @param {Compiler} compiler - This is the Compiler instance. AKA "Webacpk Central Dispatch"
     * 
     * @memberOf NormalModuleFactoryPlugin
     * 
     */
    apply(compiler) {

        // Refactorable!!!! Remember that plugins are meant to be composable single purpose pieces of functionality. That way they can be reused and modular!!!
        compiler.plugin("normal-module-factory", (normalModuleFactory, params) => {
            const LAZY_A_MODULE_RESULT_REGEXP = /lazy-a/;
            const replacementRequestString = "lazy-hijacked-request";
            const nmfPluginParams = {
                resourceRegex: LAZY_A_MODULE_RESULT_REGEXP,
                newRequestString: replacementRequestString
            }
            
            normalModuleFactory.apply(
                new BeforeResolveNormalModuleFactoryPlugin(nmfPluginParams),
                new AfterResolveNormalModuleFactoryPlugin(nmfPluginParams)
            );
        });

        compiler.plugin("context-module-factory", (contextModuleFactory, params) => {
            const DEFAULT_CONTEXT_REGEXP = /\/everything-is-a-plugin\/src/;

            /**
             * @description "before-resolve" - This is identical to normal-module-factory:before-resolve, except now we have the ability to create, remove, filter, make critical/not-critical ContextDependencies. For more information see ContextModule.
             * @param {ContextModuleFactoryBeforeResolveResult} result - This will contain all the same information that nmf will have, expect also context, regex patterns for determining new or existing contexts. These can be modified
             * @param {Function} callback any changes made to result must be passed back in and the callback must be `returned`.
             */
            contextModuleFactory.plugin("before-resolve", (result, callback) => {
                if(DEFAULT_CONTEXT_REGEXP.test(result.context) && result.request === ".") { // look for a result where the context of the request is in repo/src, and the request is an invalid context aka `require(someVar)`
                    result.request = "./context"; // Modify thie real request path to be a context folder (we are going to create a new context out of nothing)
                    result.regExp = /lazy-(.*)\.js/; // Create a regex pattern that will look inside folder for all modules that match the regex path. They will be turned into a ContextModule. In this case its like we are running "require(`./context/lazy-${moduleName}.js`)" meanwhile our real request is require(someVar)
                    result.dependencies.forEach((d) => { // Since the current request causes a critical dependency warning, we need to set this to false now that we have created the appropriate ContextModule map. 
                        if(d.critical)
                            d.critical = false;
                    });
                }
                pluginUtils.logPluginEvent("context-module-factory:before-resolve:Created Context Module out of nothing!", "ContextModuleFactoryPlugin", "bgWhite", "blue", "blue");
                return callback(null, result);
            });
        });
    }
}


module.exports = NormalModuleFactoryPlugin;