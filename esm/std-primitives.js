export function TypioRegex(pattern) {
    return Object.assign({
        $symbol: 'TypioRegex',
        $wrap(raw) {
            return raw;
        },
        $unwrap(raw) {
            return raw;
        },
        type: 'string',
        pattern,
    }, {});
}
export function TypioInteger(option) {
    return Object.assign({
        $symbol: 'TypioInteger',
        $wrap(raw) {
            return raw;
        },
        $unwrap(raw) {
            return raw;
        },
        type: 'integer',
    }, option ?? {});
}
//# sourceMappingURL=std-primitives.js.map