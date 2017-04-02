/**
 * Just some custom plugin utility(s) I wrote.
 */
const path = require("path");
const pluginUtils = require("./plugin-utils");

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
        compiler.plugin("normal-module-factory", (normalModuleFactory, params) => {
            const LAZY_A_MODULE_RESULT_REGEXP = /lazy-a/;
            const didMatchRequestWith = (request) => {
                return (regexp) => { return regexp.test(request); }
            }

            /**
             * @param {BeforeResolveResultParams} result - The result parameters that have been passed from the parser and compialtion.
             * @param {Function} callback - The callback must be returned and have the "new updated result" passed inside. (See below)
             * 
             * @description "before-resolve" - module factories are the glue that ties the parsed request, to the resolver and the NormalModule creation. This before hook allows a developer to modify a parsed and "about-to-be-request" resource path to a module (IE: require("./foo/index.js") the string in the require is the resource ) before it is resolved and turned into an actual module.
             */
            normalModuleFactory.plugin("before-resolve", (result, callback) => {
                // console.log(result);
                if (didMatchRequestWith(result.request)(LAZY_A_MODULE_RESULT_REGEXP)) {
                    pluginUtils.logPluginEvent(
                        `normal-module-factory:before-resolve:found-matching-request${result.request}`, 
                        "NormalModuleFactoryPlugin", 
                        "bgCyan", 
                        "white", 
                        "white"
                    );
                    result.request = result.request.replace(LAZY_A_MODULE_RESULT_REGEXP, "lazy-hijacked-request.js");
                }
                return callback(null, result);
            }); 


            /**
             * 
             * @param {Object} result - The result parameter in the after-resolve callback is much more decorated and filled with many properties. Too many to document here, however resource is one. Easy enough to console.log which ones show up however!
             * @param {Function} callback - This callback either expects an error or a success to be passed through. It will continue to now create modules after this is called. 
             * @description "after-resolve" - module factories are the glue that ties the parsed request, to the resolver. This after-resolve hook can not only provide information for you about a resolved module, but also allow you to customize and add additional resolved properties, like loaders, or (for ContextModuleFactory) a new and separate context map as well as even Dependency information like:
             * `importedVar: '__WEBPACK_IMPORTED_MODULE_2__c__', from HarmonyImportDependency(s).
             * 
             */
            normalModuleFactory.plugin("after-resolve", (result, callback) => {
                // console.log(result) 
                // should not step into since we wiped any file that matches /lazy-a/ and swapped it out for a different request
                if (didMatchRequestWith(result.resource)(LAZY_A_MODULE_RESULT_REGEXP)) { 
                    pluginUtils.logPluginEvent(
                        `normal-module-factory:after-resolve:found-matching-resource${result.resource}`, 
                        "NormalModuleFactoryPlugin", 
                        "bgYellow", 
                        "black", 
                        "black"
                    );

                    result.resource = path.resolve(path.dirname(result.resource), "lazy-hijacked-request");
                }

                return callback(null, result);
            });
        });
    }
}


module.exports = NormalModuleFactoryPlugin;