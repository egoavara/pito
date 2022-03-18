"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypioBool = exports.BoolProto = exports.TypioInt = exports.IntProto = exports.TypioNum = exports.NumProto = exports.TypioRegex = exports.TypioStr = exports.StrProto = exports.TypioLit = exports.LitProto = void 0;
exports.LitProto = {
    $symbol: 'TypioLit',
    $wrap(raw) { return raw; },
    $unwrap(raw) { return raw; },
    $strict() { return { const: this.const }; },
};
const TypioLit = (l) => {
    return Object.create(exports.LitProto, { const: { value: l }, });
};
exports.TypioLit = TypioLit;
exports.StrProto = {
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
const TypioStr = (option) => {
    if (option === undefined) {
        return Object.create(exports.StrProto, { type: { value: 'string' } });
    }
    return Object.assign(Object.create(exports.StrProto, { type: { value: 'string' } }), option);
};
exports.TypioStr = TypioStr;
const TypioRegex = (pattern, option) => {
    return Object.assign(Object.create(exports.StrProto, { type: { value: 'string' } }), option, { pattern: pattern });
};
exports.TypioRegex = TypioRegex;
exports.NumProto = {
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
const TypioNum = (option) => {
    if (option === undefined) {
        return Object.create(exports.NumProto, { type: { value: 'number' } });
    }
    return Object.assign(Object.create(exports.NumProto, { type: { value: 'number' } }), option);
};
exports.TypioNum = TypioNum;
exports.IntProto = {
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
const TypioInt = (option) => {
    if (option === undefined) {
        return Object.create(exports.IntProto, { type: { value: 'integer' } });
    }
    return Object.assign(Object.create(exports.IntProto, { type: { value: 'integer' } }), option);
};
exports.TypioInt = TypioInt;
exports.BoolProto = {
    $symbol: 'TypioBool',
    $wrap(raw) { return raw; },
    $unwrap(raw) { return raw; },
    $strict() {
        return { type: 'boolean' };
    },
};
const TypioBool = () => { return Object.create(exports.BoolProto, { type: { value: 'boolean' } }); };
exports.TypioBool = TypioBool;
//# sourceMappingURL=primitives.js.map