"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypioArr = exports.ArrProto = exports.TypioObj = exports.ObjProto = void 0;
exports.ObjProto = {
    $symbol: 'TypioObj',
    $wrap(raw) {
        for (const k in raw) {
            raw[k] = this.properties[k].$wrap(raw[k]);
        }
        return raw;
    },
    $unwrap(raw) {
        for (const k in raw) {
            raw[k] = this.properties[k].$unwrap(raw[k]);
        }
        return raw;
    },
    $strict() {
        return {
            type: 'object',
            properties: Object.fromEntries(Object.entries(this.properties).map(([k, v]) => {
                return [
                    k, v.$strict()
                ];
            })),
            required: new Array(...this.required),
            additionalProperties: false,
        };
    },
};
const TypioObj = (properties) => {
    return Object.create(exports.ObjProto, {
        type: { value: 'object' },
        properties: { value: properties },
        required: { value: Object.keys(properties).filter(v => properties[v]['$optional'] !== true) },
        additionalProperties: { value: false },
    });
};
exports.TypioObj = TypioObj;
exports.ArrProto = {
    $symbol: 'TypioArr',
    $wrap(raw) { return raw.map(v => this.items.$wrap(v)); },
    $unwrap(raw) { return raw.map(v => this.items.$unwrap(v)); },
    $strict() { return { type: 'array', items: this.items.$strict() }; },
};
const TypioArr = (items) => {
    return Object.create(exports.ArrProto, { type: { value: 'array' }, items: { value: items } });
};
exports.TypioArr = TypioArr;
//# sourceMappingURL=derived.js.map