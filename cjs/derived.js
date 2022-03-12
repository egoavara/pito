"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypioArray = exports.TypioObject = void 0;
function TypioObject(props) {
    return Object.assign({
        $symbol: 'TypioObject',
        $wrap(raw) {
            for (const k in raw) {
                raw[k] = props[k].$wrap(raw[k]);
            }
            return raw;
        },
        $unwrap(raw) {
            for (const k in raw) {
                raw[k] = props[k].$unwrap(raw[k]);
            }
            return raw;
        },
        type: 'object',
        properties: props,
        required: Object.keys(props),
        additionalProperties: true,
    }, {});
}
exports.TypioObject = TypioObject;
function TypioArray(inner) {
    return Object.assign({
        $symbol: 'TypioArray',
        type: 'array',
        items: inner,
        $wrap(raw) {
            return raw.map(inner.$wrap);
        },
        $unwrap(raw) {
            return raw.map(inner.$unwrap);
        },
    }, {});
}
exports.TypioArray = TypioArray;
//# sourceMappingURL=derived.js.map