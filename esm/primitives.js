export const LitProto = {
    $wrap(raw) { return raw; },
    $unwrap(raw) { return raw; },
    $strict() { return { const: this.const }; },
};
export const PitoLit = (l) => {
    return Object.create(LitProto, { const: { enumerable: true, value: l }, });
};
export const StrProto = {
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
        return strict;
    },
};
export const PitoStr = (option) => {
    if (option === undefined) {
        return Object.create(StrProto, { type: { value: 'string' } });
    }
    return Object.assign(Object.create(StrProto, { type: { value: 'string' } }), option);
};
export const RegexProto = {
    $wrap(raw) { return raw; },
    $unwrap(raw) { return raw; },
    $strict() {
        const strict = {
            type: 'string',
            pattern: this.pattern,
        };
        if (this.minLength !== undefined) {
            strict.minLength = this.minLength;
        }
        if (this.maxLength !== undefined) {
            strict.maxLength = this.maxLength;
        }
        return strict;
    },
};
export const PitoRegex = (pattern, option) => {
    return Object.assign(Object.create(RegexProto, {
        type: { value: 'string' },
        pattern: { value: pattern },
    }), option);
};
export const NumProto = {
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
export const PitoNum = (option) => {
    if (option === undefined) {
        return Object.create(NumProto, { type: { value: 'number' } });
    }
    return Object.assign(Object.create(NumProto, { type: { value: 'number' } }), option);
};
export const IntProto = {
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
export const PitoInt = (option) => {
    if (option === undefined) {
        return Object.create(IntProto, { type: { value: 'integer' } });
    }
    return Object.assign(Object.create(IntProto, { type: { value: 'integer' } }), option);
};
export const BoolProto = {
    $wrap(raw) { return raw; },
    $unwrap(raw) { return raw; },
    $strict() {
        return { type: 'boolean' };
    },
};
export const PitoBool = () => { return Object.create(BoolProto, { type: { value: 'boolean' } }); };
//# sourceMappingURL=primitives.js.map