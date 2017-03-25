const chalk = require("chalk");

module.exports = {
    logPluginEvent: function(eventName, pluginName) {
        console.log(chalk.black(chalk.bgCyan(
        `
                                                                            
                        ${chalk.bold(chalk.white("WEBPACK PLUGIN EVENT"))}                                
                                                                            
                        PLUGIN:     ${pluginName}                             
                        EVENT NAME: ${eventName}                          
                                                                            \n`
        )));
    }
}