const ioModules = require('./ioModules');

class FakeCore {
    constructor() {
        this.reset();
    }

    reset() {
        this.valid = false;
        this.config = undefined;
        this.ioMap = [];
    }

    setConfig(config) {
        reset();

        config.modules.forEach( mod => {
            if (!mod.type in ioModules.moduleMap) {
                throw new Error(`Unsupported module type ${mod.type}`);
            }

            this.ioMap.push(ioModules[mod.type](mod));
        });

        this.valid = true;
        this.config = config;
    }

    async setIO(mod, index, state) {
        if (mod >= this.ioMap.length) {
            return {
                status: 417,
                error: { message: `No such module ${mod}`, },
            }
        }

        return this.ioMap[mod].set(index, state);
    }

    getStatus() {
        return { valid: this.valid, };
    }

    dump() {
        ioMap.forEach( mod => {
            
        });
    }
}

module.exports.FakeCore = FakeCore;
