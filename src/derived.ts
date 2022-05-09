import { OptModifier } from "./modifier.js"
import { pito } from "./pito.js"
import { PitoLit } from "./primitives.js"

// Utils
export type Required<Properties extends Record<string, pito>> = { [k in keyof Properties]: Properties[k] extends OptModifier ? never : k }[keyof Properties]
export type Optionals<Properties extends Record<string, pito>> = { [k in keyof Properties]: Properties[k] extends OptModifier ? k : never }[keyof Properties]
export type TypeFromProperties<Properties extends Record<string, pito>> =
    & { [K in Required<Properties>]: pito.Type<Properties[K]> }
    & { [K in Optionals<Properties>]?: pito.Type<Properties[K]> }
export type RawFromProperties<Properties extends Record<string, pito>> =
    & { [K in Required<Properties>]: pito.Raw<Properties[K]> }
    & { [K in Optionals<Properties>]?: pito.Raw<Properties[K]> }

// Derived : Obj
export type ObjOption = {

}
export type ObjSchema<Properties extends Record<string, pito>> = { type: 'object', properties: Properties, required: (Required<Properties>)[], additionalProperties: false }

export type PitoObj<Properties extends Record<string, pito>> = pito<RawFromProperties<Properties>, TypeFromProperties<Properties>, ObjSchema<Properties>, ObjOption>
export const PitoObj = <Properties extends Record<string, pito>>(properties: Properties): PitoObj<Properties> => {
    return {
        type: 'object',
        properties,
        additionalProperties: false,
        required: Object.keys(properties).filter(v => (properties[v] as any)['$optional'] !== true) as any,
        // @ts-expect-error
        $wrap(raw) {
            for (const k in raw) {
                // @ts-expect-error
                if (this.required.indexOf(k) !== -1) {
                    // @ts-expect-error
                    raw[k] = this.properties[k].$wrap(raw[k])
                } else {
                    // @ts-expect-error
                    if (raw[k] !== undefined) {
                        // @ts-expect-error
                        raw[k] = this.properties[k].$wrap(raw[k])
                    }
                }
            }
            return raw
        },
        // @ts-expect-error
        $unwrap(raw) {
            for (const k in raw) {
                // @ts-expect-error
                raw[k] = this.properties[k].$unwrap(raw[k])
            }
            return raw
        },
        // @ts-expect-error
        $strict() {
            return {
                type: 'object',
                properties: Object.fromEntries(
                    Object.entries(this.properties).map(([k, v]) => {
                        return [
                            k, v.$strict()
                        ]
                    })
                ),
                required: new Array(...this.required),
                additionalProperties: false,
            }
        },
    }
}

// Derived : Arr
export type ArrOption = {}
export type ArrSchema = { type: 'array', items: pito }
export type PitoArr<Items extends pito> = pito<pito.Raw<Items>[], pito.Type<Items>[], ArrSchema, ArrOption>
export const PitoArr = <Items extends pito>(items: Items, option?: ArrOption): PitoArr<Items> => {
    return {
        type: 'array',
        items: items,
        $wrap(raw) { return raw.map(v => this.items.$wrap(v)) },
        $unwrap(raw) { return raw.map(v => this.items.$unwrap(v)) },
        $strict() { return { type: 'array', items: this.items.$strict() } },
    }
}


// Derived : Tuple
export type TupleOption = {}
export type TupleSchema<Items extends [...pito[]]> = { type: 'array', prefixItems: Items }
export type PitoTuple<Items extends [...pito[]]> =
    pito<pito.MapRaw<Items>, pito.MapType<Items>, TupleSchema<Items>, TupleOption>
export const PitoTuple =
    <Items extends [...pito[]]>
        (items: Items, option?: TupleOption)
        : PitoTuple<Items> => {
        return {
            type: 'array',
            prefixItems: items,
            $wrap(raw) {
                return raw.map((v, i) => this.prefixItems[i].$wrap(v)) as any
            },
            $unwrap(raw) {
                return raw.map((v, i) => this.prefixItems[i].$unwrap(v)) as any
            },
            $strict() {
                return { type: 'array', prefixItems: items, ...(option ?? {}) }
            },
        }
    }




// Derived : Record
export type RecordOption = {}
export type RecordSchema<Value extends pito> = { type: 'object', additionalProperties: pito.Strict<Value> }
export type PitoRecord<Value extends pito> = pito<Record<string, pito.Raw<Value>>, Record<string, pito.Type<Value>>, RecordSchema<Value>, RecordOption>

export const PitoRecord = <Items extends pito>
    (items: Items, option?: RecordOption)
    : PitoRecord<Items> => {
    return {
        type: 'object',
        additionalProperties: pito.strict(items) as any,
        $wrap(raw) {
            return Object.fromEntries(
                Object
                    .entries(raw)
                    .map(([k, v]) => [k, pito.wrap(items, v)])
            )
        },
        $unwrap(raw) {
            return Object.fromEntries(
                Object
                    .entries(raw)
                    .map(([k, v]) => [k, pito.unwrap(items, v)])
            )
        },
        $strict() {
            return { type: 'object', additionalProperties: pito.strict(items) as any, ...(option ?? {}) }
        },
    }
}



