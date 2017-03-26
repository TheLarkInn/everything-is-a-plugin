const chalk = require("chalk");
const pluginUtils = require("./plugin-utils");

function BasicPlugin(message) {
    this.message = message;
}

BasicPlugin.prototype.apply = function apply(compiler) {
    compiler.plugin("run", (compiler, callback) => {
        pluginUtils.logPluginEvent(`compiler.run.message.${this.message}`, "BasicPlugin");
    });
}

module.exports = BasicPlugin;