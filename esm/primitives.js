export const LitProto = {
    $symbol: 'TypioLit',
    $wrap(raw) { return raw; },
    $unwrap(raw) { return raw; },
    $strict() { return { const: this.const }; },
};
export const TypioLit = (l) => {
    return Object.create(LitProto, { const: { value: l }, });
};
export const StrProto = {
    $symbol: 'TypioStr',
    $wrap(raw) { return raw; },
    $unwrap(raw) { return raw; },
    $strict() {
        const strict = {
            type: 'string'
        };
        if (this.minLength !== undefined) {
            strict.minLength = this.minLength;
        }
        if (this.maxLength !== undefined) {
            strict.maxLength = this.maxLength;
        }
        if (this.pattern !== undefined) {
            strict.pattern = this.pattern;
        }
        return strict;
    },
};
export const TypioStr = (option) => {
    if (option === undefined) {
        return Object.create(StrProto, { type: { value: 'string' } });
    }
    return Object.assign(Object.create(StrProto, { type: { value: 'string' } }), option);
};
export const TypioRegex = (pattern, option) => {
    return Object.assign(Object.create(StrProto, { type: { value: 'string' } }), option, { pattern: pattern });
};
export const NumProto = {
    $symbol: 'TypioNum',
    $wrap(raw) { return raw; },
    $unwrap(raw) { return raw; },
    $strict() {
        const strict = {
            type: 'number'
        };
        if (this.multipleOf !== undefined) {
            strict.multipleOf = this.multipleOf;
        }
        if (this.minimum !== undefined) {
            strict.minimum = this.minimum;
        }
        if (this.exclusiveMinimum !== undefined) {
            strict.exclusiveMinimum = this.exclusiveMinimum;
        }
        if (this.maximum !== undefined) {
            strict.maximum = this.maximum;
        }
        if (this.exclusiveMaximum !== undefined) {
            strict.exclusiveMaximum = this.exclusiveMaximum;
        }
        return strict;
    },
};
export const TypioNum = (option) => {
    if (option === undefined) {
        return Object.create(NumProto, { type: { value: 'number' } });
    }
    return Object.assign(Object.create(NumProto, { type: { value: 'number' } }), option);
};
export const IntProto = {
    $symbol: 'TypioInt',
    $wrap(raw) { return raw; },
    $unwrap(raw) { return raw; },
    $strict() {
        const strict = {
            type: 'integer'
        };
        if (this.multipleOf !== undefined) {
            strict.multipleOf = this.multipleOf;
        }
        if (this.minimum !== undefined) {
            strict.minimum = this.minimum;
        }
        if (this.exclusiveMinimum !== undefined) {
            strict.exclusiveMinimum = this.exclusiveMinimum;
        }
        if (this.maximum !== undefined) {
            strict.maximum = this.maximum;
        }
        if (this.exclusiveMaximum !== undefined) {
            strict.exclusiveMaximum = this.exclusiveMaximum;
        }
        return strict;
    },
};
export const TypioInt = (option) => {
    if (option === undefined) {
        return Object.create(IntProto, { type: { value: 'integer' } });
    }
    return Object.assign(Object.create(IntProto, { type: { value: 'integer' } }), option);
};
export const BoolProto = {
    $symbol: 'TypioBool',
    $wrap(raw) { return raw; },
    $unwrap(raw) { return raw; },
    $strict() {
        return { type: 'boolean' };
    },
};
export const TypioBool = () => { return Object.create(BoolProto, { type: { value: 'boolean' } }); };
//# sourceMappingURL=primitives.js.map