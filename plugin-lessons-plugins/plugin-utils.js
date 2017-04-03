const chalk = require("chalk");

module.exports = {
    logPluginEvent: function(eventName, pluginName, backgroundColor = "bgCyan", textColor = "white", titleColor = "black") {
        console.log(chalk[titleColor](chalk[backgroundColor](
        `
                                                                            
                        ${chalk.bold(chalk[textColor]("WEBPACK PLUGIN EVENT"))}                                
                                                                            
                        PLUGIN:     ${pluginName}                             
                        EVENT NAME: ${eventName}                          
                                                                            \n`
        )));
    }
}


const makeCustomPlugin = (superclass) => class extends superclass {
    constructor(options) {}

    apply(instance) {

    }    
}

const Plugin = (x) => ({
    map: f => PluginGenerator(f(x)),
    fold: f => f(x),
    inspect: () => `PluginGenerator(${x})`
});