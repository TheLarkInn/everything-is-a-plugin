const chalk = require("chalk");
const pluginUtils = require("./plugin-utils");

const runBefore = (runExpression) => {
    runExpression();
    return (before) => { before() };
}

const apply = (props, compiler) => {
    compiler.plugin("run", (copmiler, callback) => {
       runBefore(() => {pluginUtils.logPluginEvent("compiler:run ", "BasicPlugin")})(callback); 
    });
}

const BasicPlugin = (props) => {
    return {
        apply: apply.bind(this, props)
    }
}


module.exports = BasicPlugin;