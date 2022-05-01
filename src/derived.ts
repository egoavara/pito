import { OptModifier } from "./modifier.js"
import { pito } from "./pito.js"
import { PitoLit } from "./primitives.js"

// Utils
type Required<Properties extends Record<string, pito>> = { [k in keyof Properties]: Properties[k] extends OptModifier ? never : k }[keyof Properties]
type Optionals<Properties extends Record<string, pito>> = { [k in keyof Properties]: Properties[k] extends OptModifier ? k : never }[keyof Properties]
type TypeFromProperties<Properties extends Record<string, pito>> =
    & { [K in Required<Properties>]: pito.Type<Properties[K]> }
    & { [K in Optionals<Properties>]?: pito.Type<Properties[K]> }
type RawFromProperties<Properties extends Record<string, pito>> =
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
                raw[k] = this.properties[k].$wrap(raw[k])
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


// Derived : Union
type ParsePitoUnionObj<Key extends string, Items extends Record<string, pito.Obj<Record<string, pito>>>> = {
    [ItemKey in keyof Items]: Items[ItemKey] extends pito.Obj<infer A>
    ? (
        ItemKey extends string
        ? pito.Obj<A & Record<Key, pito.Lit<ItemKey>>>
        : never
    )
    : never
}[keyof Items]

export type UnionObjOption = {}
export type UnionObjSchema<Key extends string, Items extends Record<string, PitoObj<Record<string, pito>>>> = { anyOf: any[], }
export type PitoUnionObj<Key extends string, Items extends Record<string, PitoObj<Record<string, pito>>>> = pito<pito.Raw<ParsePitoUnionObj<Key, Items>>, pito.Type<ParsePitoUnionObj<Key, Items>>, UnionObjSchema<Key, Items>, UnionObjOption>
export const PitoUnionObj =
    <
        Key extends string,
        Items extends Record<string, PitoObj<Record<string, pito>>>
    >
        (key: Key, items: Items): PitoUnionObj<Key, Items> => {
        const modItems = Object.fromEntries(Object.entries(items).map(([k, v]) => {
            const strict = v as PitoObj<Record<string, pito>>
            const props: Record<string, pito> = {}
            for (const k in strict.properties) {
                props[k] = strict.properties[k]
            }
            props[key] = PitoLit(k)
            const copyed = PitoObj(props)
            return [k, copyed]
        }))
        return {
            anyOf: Object.values(modItems),
            // @ts-expect-error
            $wrap(raw) {
                // @ts-expect-error
                return modItems[raw[key]].$wrap(raw)
            },
            // @ts-expect-error
            $unwrap(raw) {
                // @ts-expect-error
                return modItems[raw[key]].$unwrap(raw)
            },
            $strict() {
                return {
                    anyOf: this.anyOf.map(v => v.$strict())
                }
            },
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



