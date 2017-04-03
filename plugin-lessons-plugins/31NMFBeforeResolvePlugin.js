/**
 * Just some custom plugin utility(s) I wrote.
 */
const path = require("path");
const pluginUtils = require("./plugin-utils");

class BeforeResolveNormalModuleFactoryPlugin {
    constructor(options) {
        this.resourceRegex = options.resourceRegex;
        this.newRequestString = options.newRequestString;
    }

    didMatchRequestWith(request) {
        return (regexp) => regexp.test(request);
    }
    
    apply(normalModuleFactory) {
    
        /**
         * @param {BeforeResolveResultParams} result - The result parameters that have been passed from the parser and compialtion.
         * @param {Function} callback - The callback must be returned and have the "new updated result" passed inside. (See below)
         * 
         * @description "before-resolve" - module factories are the glue that ties the parsed request, to the resolver and the NormalModule creation. This before hook allows a developer to modify a parsed and "about-to-be-request" resource path to a module (IE: require("./foo/index.js") the string in the require is the resource ) before it is resolved and turned into an actual module.
         */
        normalModuleFactory.plugin("before-resolve", (result, callback) => {
            // console.log(result);
            if (this.didMatchRequestWith(result.request)(this.resourceRegex)) {
                pluginUtils.logPluginEvent(
                    `normal-module-factory:before-resolve:found-matching-request${result.request}`, 
                    "NormalModuleFactoryPlugin", 
                    "bgCyan", 
                    "white", 
                    "white"
                );
                result.request = result.request.replace(this.resourceRegex, this.newRequestString);
            }
            return callback(null, result);
        }); 

    }
}

module.exports = BeforeResolveNormalModuleFactoryPlugin;