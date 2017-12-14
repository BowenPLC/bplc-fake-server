class FakeOutputModule {
    constructor(type, defaultValue, config) {
        this.type = type;
        this.outputs = Array(config.size).fill(defaultValue);
        this.outOfRangeError = {
            status: 417,
            error: { message: 'Module index out of range.' }
        };
    }

    get(index) {
        if (index >= this.outputs.length) {
            return this.outOfRangeError;
        }

        return { result: this.outputs[ index ] };
    }

    set(index, state) {
        if (index >= this.outputs.length) {
            return this.outOfRangeError;
        }

        const type = typeof(state);
        if (type !== this.type) {
            return {
                status: 417,
                error: {message: `Type error: need state of type ${this.type}, got ${type}.` }
            }
        }

        this.outputs[ index ] = state;
        return undefined;
    }
}

module.exports.moduleMap = {
    'DigitalOutput': config => new FakeOutputModule('boolean', false, config),
    'StringOutput': config => new FakeOutputModule('string', '', config),
};
