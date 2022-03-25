"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PitoUnionObj = exports.UnionObjProto = exports.PitoArr = exports.ArrProto = exports.PitoObj = exports.ObjProto = void 0;
const primitives_js_1 = require("./primitives.js");
exports.ObjProto = {
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
const PitoObj = (properties) => {
    return Object.create(exports.ObjProto, {
        type: { enumerable: true, value: 'object' },
        properties: { enumerable: true, value: properties },
        required: { enumerable: true, value: Object.keys(properties).filter(v => properties[v]['$optional'] !== true) },
        additionalProperties: { enumerable: true, value: false },
    });
};
exports.PitoObj = PitoObj;
exports.ArrProto = {
    $wrap(raw) { return raw.map(v => this.items.$wrap(v)); },
    $unwrap(raw) { return raw.map(v => this.items.$unwrap(v)); },
    $strict() { return { type: 'array', items: this.items.$strict() }; },
};
const PitoArr = (items, option) => {
    return Object.assign(Object.create(exports.ArrProto, {
        type: { enumerable: true, value: 'array' },
        items: { enumerable: true, value: items },
    }), option ?? {});
};
exports.PitoArr = PitoArr;
exports.UnionObjProto = {
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
const PitoUnionObj = (key, items) => {
    const modItems = Object.fromEntries(Object.entries(items).map(([k, v]) => {
        const strict = v;
        const props = {};
        for (const k in strict.properties) {
            props[k] = strict.properties[k];
        }
        props[key] = (0, primitives_js_1.PitoLit)(k);
        const copyed = (0, exports.PitoObj)(props);
        return [k, copyed];
    }));
    return Object.create(exports.UnionObjProto, {
        anyOf: {
            enumerable: true, value: Object.values(modItems),
        },
        $unionObj: { enumerable: false, value: modItems },
        $unionObjKey: { enumerable: false, value: key },
    });
};
exports.PitoUnionObj = PitoUnionObj;
//# sourceMappingURL=derived.js.map