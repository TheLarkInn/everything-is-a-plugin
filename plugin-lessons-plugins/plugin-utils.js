const chalk = require("chalk");

module.exports = {
    logPluginEvent: function(eventName, pluginName, backgroundColor = "bgCyan") {
        console.log(chalk.black(chalk[backgroundColor](
        `
                                                                            
                        ${chalk.bold(chalk.white("WEBPACK PLUGIN EVENT"))}                                
                                                                            
                        PLUGIN:     ${pluginName}                             
                        EVENT NAME: ${eventName}                          
                                                                            \n`
        )));
    }
}