export function TypioLiteral(l) {
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
export function TypioString() {
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
export function TypioNumber(option) {
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
export function TypioBoolean() {
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
//# sourceMappingURL=primitives.js.map