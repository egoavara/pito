"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PitoEnums = exports.EnumProto = void 0;
exports.EnumProto = {
    $wrap(raw) { return raw; },
    $unwrap(raw) { return raw; },
    $strict() {
        return {
            anyOf: this.anyOf,
        };
    },
};
const PitoEnums = (e, option) => {
    const anyOf = Object.entries(e)
        .filter(([k, v]) => isNaN(k))
        .map(([k, v]) => {
        switch (typeof v) {
            case 'string':
                return { type: 'string', const: v };
            case 'number':
                return { type: 'number', const: v };
            default:
                return undefined;
        }
    })
        .filter(v => v !== undefined);
    return Object.assign(Object.create(exports.EnumProto), { anyOf }, option ?? {});
};
exports.PitoEnums = PitoEnums;
//# sourceMappingURL=enums.js.map