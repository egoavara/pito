import { pito } from "./pito.js"

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
        $bypass() { return true },
        $isAssignableRaw(data) {
            return Array.isArray(data)
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
            $bypass() {
                return this.prefixItems.findIndex(v => !v.$bypass()) === -1
            },
            $isAssignableRaw(data) {
                return Array.isArray(data) && data.length === items.length
            },
        }
    }




// Derived : Record
export type RecordOption = {}
export type RecordSchema<Value extends pito> = { type: 'object', additionalProperties: Value }
export type PitoRecord<Value extends pito> = pito<Record<string, pito.Raw<Value>>, Record<string, pito.Type<Value>>, RecordSchema<Value>, RecordOption>

export const PitoRecord = <Items extends pito>
    (items: Items, option?: RecordOption)
    : PitoRecord<Items> => {
    return {
        type: 'object',
        additionalProperties: items,
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
        $bypass() {
            return this.additionalProperties.$bypass()
        },
        $isAssignableRaw(data) {
            return typeof data === 'object'
        },
    }
}



