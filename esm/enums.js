export const EnumProto = {
    $wrap(raw) { return raw; },
    $unwrap(raw) { return raw; },
    $strict() {
        return {
            anyOf: this.anyOf,
        };
    },
};
export const PitoEnums = (e, option) => {
    const anyOf = Object.entries(e)
        .filter(([k, v]) => isNaN(k))
        .map(([k, v]) => {
        switch (typeof v) {
            case 'string':
                return { const: v };
            case 'number':
                return { const: v };
            default:
                return undefined;
        }
    })
        .filter(v => v !== undefined);
    return Object.assign(Object.create(EnumProto), { anyOf }, option ?? {});
};
//# sourceMappingURL=enums.js.map