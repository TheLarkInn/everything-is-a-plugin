const chalk = require("chalk");
const pluginUtils = require("./plugin-utils");

class BasicPlugin {
    constructor() {
        /**
         * Part 1.0
         * Constructors on webpack plugins are optional. 
         * They are only needed if you are planning on allowing your user to pass options. 
         * 
         * In terminal run `npm run build` to see the event triggered.
         */
         pluginUtils.logPluginEvent("pluginDidMount", "BasicPlugin");
    }
    apply(compiler) {
    }
}

module.exports = BasicPlugin;