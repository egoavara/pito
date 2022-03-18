export const ObjProto = {
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
export const TypioObj = (properties) => {
    return Object.create(ObjProto, {
        type: { value: 'object' },
        properties: { value: properties },
        required: { value: Object.keys(properties).filter(v => properties[v]['$optional'] !== true) },
        additionalProperties: { value: false },
    });
};
export const ArrProto = {
    $symbol: 'TypioArr',
    $wrap(raw) { return raw.map(v => this.items.$wrap(v)); },
    $unwrap(raw) { return raw.map(v => this.items.$unwrap(v)); },
    $strict() { return { type: 'array', items: this.items.$strict() }; },
};
export const TypioArr = (items) => {
    return Object.create(ArrProto, { type: { value: 'array' }, items: { value: items } });
};
//# sourceMappingURL=derived.js.map