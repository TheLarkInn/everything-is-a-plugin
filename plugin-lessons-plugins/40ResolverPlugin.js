/**
 * Just some custom plugin utility(s) I wrote.
 */
const DescriptionFileUtils = require("enhanced-resolve/lib/DescriptionFileUtils");
const createInnerCallback = require("enhanced-resolve/lib/createInnerCallback");

const pluginUtils = require("./plugin-utils");


/**
 * @class ResolverPlugin - This is a example of a webpack plugin using `class`. The most common and easy to understand syntax
 */
class ResolverPlugin {
    /**
     * @description Creates an instance of ResolverPlugin.
     * @param {object} options - Adds options from your configuration into the plugin for additional functionality
     * 
     * @memberOf ResolverPlugin
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
     * @memberOf ResolverPlugin
     */
    apply(compiler) {
        // plugins.push(new DescriptionFilePlugin("parsed-resolve", descriptionFiles, "described-resolve"));

        /**
         * @description "after-resolvers" - This is another async compiler plugin hook the compiler. after-resolvers fires directly after the compiler populates resolvers for webpack and attaches them to the compiler instance. If you are planning to plug into the resolver, you need to do so after resolvers have been created and attached, thus the need for this first hook. 
         */
        compiler.plugin("after-resolvers", (compiler) => {
            pluginUtils.logPluginEvent(`Resolvers have now been created ${compiler.resolvers.normal}`, "ResolverPlugin", "bgBlue", "white", "white");
            
            const resolver = compiler.resolvers.normal;
            
            /**
             * @description "described-resolve" - This is one of many events that will be emitted. The full list can be found in enhanced-resolve/lib/ResolverFactory.js Each plugin calls "doResolve" at the end to pass the resolved information to the next resolution strategy. 
             * @callback {Function} 
             * @param {Request} request - The request object that is returned during the resolver's waterfall based resolution process. Throughout the resolver, an object is passed through every resolver plugin searching for different pattersn to find your module, this request represents that object and as the resolution algorhythm gets closer to finding the module, more information is collected within this object. For more information see "enhanced-resolve".
             */
            resolver.plugin("described-relative", (request, callback) => {
                const directory = request.path;
                DescriptionFileUtils.loadDescriptionFile(resolver, directory, ["wat.json"], ((err, result) => {
                    console.log(directory);
                    if(err) return callback(err);
                    if(!result) {
                        if(callback.missing) {
                            callback.missing.push(resolver.join(directory, "wat.json"));
                        }
                        if(callback.log) callback.log("No description file found");
                        return callback();
                    }

                const relativePath = "." + request.path.substr(result.directory.length).replace(/\\/g, "/");
                
                // This is the requst that will be passed on to the next resolver plugin.
                const obj = Object.assign({}, request, {
                    descriptionFilePath: result.path,
                    descriptionFileData: result.content,
                    descriptionFileRoot: result.directory,
                    relativePath: relativePath
                });

                // This basically tells 
                resolver.doResolve("directory", obj, "using description file: " + result.path + " (relative path: " + relativePath + ")", createInnerCallback((err, result) => {
					if(err) return callback(err);
					if(result) {
                        console.log(result);
                        pluginUtils.logPluginEvent(`Successfully resolved ${result.path}\n via custom description file ${result.__innerRequest_relativePath}`, "ResolverPlugin", "bgRed", "white", "white");
                        return callback(null, result);
                    }
				}, callback));
                }));
            });
        });
    }
}

module.exports = ResolverPlugin;