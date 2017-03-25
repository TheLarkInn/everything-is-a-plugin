const chalk = require("chalk");
const pluginUtils = require("./plugin-utils");

class BasicPlugin {
    constructor(messageArg) {
        pluginUtils.logPluginEvent("pluginDidMount", "BasicPlugin");

        this.messageArg = messageArg;
    }

    apply(compiler) {
        const message = this.messageArg;

        compiler.plugin(["run","watch-run"], (compiler, callback) => {
            console.log(message);
            callback();
        });
    }
}

module.exports = BasicPlugin;