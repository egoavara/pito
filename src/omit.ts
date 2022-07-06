import { PitoObj } from "./obj.js"
import { pito, plugin } from "./pito.js"
// import { pito } from "./pito.js"
import { PitoUnionObj, PitoUnionObjBuilder } from "./union-obj.js"
export type OmitObj<O, Keys extends string> = O extends PitoObj<infer Def> ? PitoObj<Omit<Def, Keys>> : never

export type PitoOmit<Obj, Keys extends string> =
    Obj extends PitoObj<infer O>
    ? PitoObj<Omit<O, Keys>>
    : Obj extends PitoUnionObj<infer K, infer V>
    ? PitoUnionObj<K, OmitObj<V, Keys>>
    : never
export function PitoOmit<
    UKey extends string,
    UVal extends PitoObj<Record<string, pito>>,
    Keys extends [string, ...string[]]
>(def: PitoUnionObj<UKey, UVal>, ...keys: Keys)
    : PitoUnionObj<UKey, OmitObj<UVal, Keys[number]>>
export function PitoOmit<T extends Record<string, pito>, Keys extends [string, ...string[]]>(def: pito.Obj<T>, ...keys: Keys)
    : PitoObj<Omit<T, Keys[number]>>
export function PitoOmit(def: PitoObj<Record<string, pito>> | PitoUnionObj<string, pito>, ...keys: string[]): pito {
    if ('anyOf' in def) {
        if (keys.includes(def.$unionKey)) {
            throw new Error(`pito.Uobj omit required field ${def.$unionKey}`)
        }
        let temp: PitoUnionObjBuilder<string, [string | number, PitoObj<Record<string, pito>>][]> = PitoUnionObj(def.$unionKey)
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