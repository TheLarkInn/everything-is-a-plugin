const chalk = require("chalk");
const pluginUtils = require("./plugin-utils");

class BasicPlugin {
    constructor() {
        /**
         * Part 1
         * Constructors on webpack plugins are optional. 
         * They are only needed if you are planning on allowing your user to pass options.
         * 
         */
         pluginUtils.logPluginEvent("pluginDidMount", "BasicPlugin");
    }
    apply(compiler) {
        /**
         * Part 2
         * How to hook.
         */
        // compiler.plugin("run", (compiler, callback) => {
        //     const pinkMessage = chalk.magenta("\n\nHello World\n\n");
        //     console.log(pinkMessage);

        //     callback();
        // });
        // compiler.plugin("watch-run", (compiler, callback) => {
        //     const pinkMessage = chalk.magenta("\n\nHello World\n\n");
        //     console.log(pinkMessage);

        //     callback();
        // }); 
        /**
         * Part 3
         * How to hook (multi-hook)
         */

        compiler.plugin(["run","watch-run"], (compiler, callback) => {
            const pinkMessage = chalk.magenta("\n\nHello World\n\n");
            console.log(pinkMessage);

            callback();
        });
    }
}

module.exports = BasicPlugin;