"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypioBoolean = exports.TypioNumber = exports.TypioString = exports.TypioLiteral = void 0;
function TypioLiteral(l) {
    return {
        $symbol: 'TypioLiteral',
        $unwrap(raw) {
            return raw;
        },
        $wrap(raw) {
            return raw;
        },
        const: l,
    };
}
exports.TypioLiteral = TypioLiteral;
function TypioString() {
    return Object.assign({
        $symbol: 'TypioString',
        $unwrap(raw) {
            return raw;
        },
        $wrap(raw) {
            return raw;
        },
        type: 'string',
    }, {});
}
exports.TypioString = TypioString;
function TypioNumber(option) {
    return Object.assign({
        $symbol: 'TypioNumber',
        $unwrap(raw) {
            return raw;
        },
        $wrap(raw) {
            return raw;
        },
        type: 'number',
    }, option ?? {});
}
exports.TypioNumber = TypioNumber;
function TypioBoolean() {
    return Object.assign({
        $symbol: 'TypioBoolean',
        $unwrap(raw) {
            return raw;
        },
        $wrap(raw) {
            return raw;
        },
        type: 'boolean',
    }, {});
}
exports.TypioBoolean = TypioBoolean;
//# sourceMappingURL=primitives.js.map