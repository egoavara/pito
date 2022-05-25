import { pito } from "./pito.js"
import { PitoUnionObjBuilder } from "./union.js"
export type OmitObj<O, Keys extends string> = O extends pito.Obj<infer Def> ? pito.Obj<Omit<Def, Keys>> : never

export type PitoOmit<Obj, Keys extends string> =
    Obj extends pito.Obj<infer O>
    ? pito.Obj<Omit<O, Keys>>
    : Obj extends pito.Uobj<infer K, infer V>
    ? pito.Uobj<K, OmitObj<V, Keys>>
    : never
export function PitoOmit<
    UKey extends string,
    UVal extends pito.Obj<Record<string, pito>>,
    Keys extends [string, ...string[]]
>(def: pito.Uobj<UKey, UVal>, ...keys: Keys)
    : pito.Uobj<UKey, OmitObj<UVal, Keys[number]>>
export function PitoOmit<T extends Record<string, pito>, Keys extends [string, ...string[]]>(def: pito.Obj<T>, ...keys: Keys)
    : pito.Obj<Omit<T, Keys[number]>>
export function PitoOmit(def: pito.Obj<Record<string, pito>> | pito.Uobj<string, pito>, ...keys: string[]): pito {
    if ('anyOf' in def) {
        if (keys.includes(def.$unionKey)) {
            throw new Error(`pito.Uobj omit required field ${def.$unionKey}`)
        }
        let temp: PitoUnionObjBuilder<string, [string | number, pito.Obj<Record<string, pito>>][]> = pito.Uobj(def.$unionKey)
        for (const [k, v] of def.$unionMap.entries()) {
            // @ts-expect-error
            temp = temp.case(k, PitoOmit(v, ...keys))
        }
        return temp.end()
    } else {

        return pito.Obj(
            Object.fromEntries(
                Object.entries(def.properties).filter(([k, v]) => !keys.includes(k))
            )
        )
    }
    throw new Error(`unreachable type`)
}