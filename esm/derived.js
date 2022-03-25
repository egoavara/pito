import { PitoLit } from "./primitives.js";
export const ObjProto = {
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
export const PitoObj = (properties) => {
    return Object.create(ObjProto, {
        type: { enumerable: true, value: 'object' },
        properties: { enumerable: true, value: properties },
        required: { enumerable: true, value: Object.keys(properties).filter(v => properties[v]['$optional'] !== true) },
        additionalProperties: { enumerable: true, value: false },
    });
};
export const ArrProto = {
    $wrap(raw) { return raw.map(v => this.items.$wrap(v)); },
    $unwrap(raw) { return raw.map(v => this.items.$unwrap(v)); },
    $strict() { return { type: 'array', items: this.items.$strict() }; },
};
export const PitoArr = (items, option) => {
    return Object.assign(Object.create(ArrProto, {
        type: { enumerable: true, value: 'array' },
        items: { enumerable: true, value: items },
    }), option ?? {});
};
export const UnionObjProto = {
    $wrap(raw) {
        return this.$unionObj[raw[this.$unionObjKey]].$wrap(raw);
    },
    $unwrap(raw) {
        return this.$unionObj[raw[this.$unionObjKey]].$unwrap(raw);
    },
    $strict() {
        return {
            anyOf: this.anyOf.map(v => v.$strict())
        };
    },
};
export const PitoUnionObj = (key, items) => {
    const modItems = Object.fromEntries(Object.entries(items).map(([k, v]) => {
        const strict = v;
        const props = {};
        for (const k in strict.properties) {
            props[k] = strict.properties[k];
        }
        props[key] = PitoLit(k);
        const copyed = PitoObj(props);
        return [k, copyed];
    }));
    return Object.create(UnionObjProto, {
        anyOf: {
            enumerable: true, value: Object.values(modItems),
        },
        $unionObj: { enumerable: false, value: modItems },
        $unionObjKey: { enumerable: false, value: key },
    });
};
//# sourceMappingURL=derived.js.map