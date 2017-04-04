import a from "./a";
import b from "./b";
import c from "./c";

// const contextRequire = (moduleName) => {
//     return require(`./context/${moduleName}.js`);
// }

const criticalContextRequire = (moduleName) => {
    return require(moduleName); // <=== This should emit a warning by default in webpack, because there is no context provided
}

import("./lazy/lazy-a")
    .then(moduleA => {
        return import("./lazy/lazy-b")
            .then(moduleB => {
                return import("./lazy/lazy-c")
                    .then(moduleC => {
                        console.log(moduleA, moduleB, moduleC);
                    });
            });
    });


// Creating your own "description file", and loading it. This should load wat.js automatically. 
import "./wat_module"

    
    