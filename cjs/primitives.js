"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PitoBool = exports.BoolProto = exports.PitoInt = exports.IntProto = exports.PitoNum = exports.NumProto = exports.PitoRegex = exports.RegexProto = exports.PitoStr = exports.StrProto = exports.PitoLit = exports.LitProto = void 0;
exports.LitProto = {
    $wrap(raw) { return raw; },
    $unwrap(raw) { return raw; },
    $strict() { return { const: this.const }; },
};
const PitoLit = (l) => {
    return Object.create(exports.LitProto, { const: { enumerable: true, value: l }, });
};
exports.PitoLit = PitoLit;
exports.StrProto = {
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
const PitoStr = (option) => {
    if (option === undefined) {
        return Object.create(exports.StrProto, { type: { value: 'string' } });
    }
    return Object.assign(Object.create(exports.StrProto, { type: { value: 'string' } }), option);
};
exports.PitoStr = PitoStr;
exports.RegexProto = {
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
const PitoRegex = (pattern, option) => {
    return Object.assign(Object.create(exports.RegexProto, {
        type: { value: 'string' },
        pattern: { value: pattern },
    }), option);
};
exports.PitoRegex = PitoRegex;
exports.NumProto = {
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
const PitoNum = (option) => {
    if (option === undefined) {
        return Object.create(exports.NumProto, { type: { value: 'number' } });
    }
    return Object.assign(Object.create(exports.NumProto, { type: { value: 'number' } }), option);
};
exports.PitoNum = PitoNum;
exports.IntProto = {
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
const PitoInt = (option) => {
    if (option === undefined) {
        return Object.create(exports.IntProto, { type: { value: 'integer' } });
    }
    return Object.assign(Object.create(exports.IntProto, { type: { value: 'integer' } }), option);
};
exports.PitoInt = PitoInt;
exports.BoolProto = {
    $wrap(raw) { return raw; },
    $unwrap(raw) { return raw; },
    $strict() {
        return { type: 'boolean' };
    },
};
const PitoBool = () => { return Object.create(exports.BoolProto, { type: { value: 'boolean' } }); };
exports.PitoBool = PitoBool;
//# sourceMappingURL=primitives.js.map