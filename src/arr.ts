import { pito, plugin } from "./pito.js"

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

    }
}

// 
Object.defineProperty(plugin, 'Arr', { value: PitoArr, configurable: false, writable: false })
// 
declare module './pito' {
    interface PitoPlugin {
        Arr: typeof PitoArr
    }
    namespace pito {
        type Arr<Items extends pito> = PitoArr<Items>
    }
}