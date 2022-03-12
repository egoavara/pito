export function TypioObject(props) {
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
export function TypioArray(inner) {
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
//# sourceMappingURL=derived.js.map