/**
 * Just some custom plugin utility(s) I wrote.
 */
const path = require("path");
const pluginUtils = require("./plugin-utils");

class AfterResolveNormalModuleFactoryPlugin {
    constructor(options) {
        this.resourceRegex = options.resourceRegex;
        this.newRequestString = options.newRequestString;
    }

    didMatchRequestWith(request) {
        return (regexp) => regexp.test(request);
    }

    apply(normalModuleFactory) {
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
            if (this.didMatchRequestWith(result.resource)(this.resourceRegex)) { 
                pluginUtils.logPluginEvent(
                    `normal-module-factory:after-resolve:found-matching-resource${result.resource}`, 
                    "NormalModuleFactoryPlugin", 
                    "bgYellow", 
                    "black", 
                    "black"
                );

                result.resource = path.resolve(path.dirname(result.resource), this.newRequestString);
            }

            return callback(null, result);
        });
    }
}

module.exports = AfterResolveNormalModuleFactoryPlugin;