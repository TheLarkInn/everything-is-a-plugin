import a from "./a";
import b from "./b";
import c from "./c";

// const contextRequire = (moduleName) => {
//     return require(`./context/${moduleName}.js`);
// }

const criticalContextRequire = (moduleName) => {
    return require(moduleName);
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
    