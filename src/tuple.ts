import { pito } from "./pito.js"


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
        }
    }
