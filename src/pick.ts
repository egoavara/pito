import { pito, plugin } from "./pito.js"
import { PitoUnionObjBuilder } from "./union-obj.js"
export type PickObj<O, Keys extends string> = O extends pito.Obj<infer Def> ? pito.Obj<Pick<Def, Keys>> : never

export type PitoPick<Obj, Keys extends string> =
    Obj extends pito.Obj<infer O>
    ? pito.Obj<Pick<O, Keys>>
    : Obj extends pito.Uobj<infer K, infer V>
    ? pito.Uobj<K, PickObj<V, Keys>>
    : never
export function PitoPick<
    UKey extends string,
    UVal extends pito.Obj<Record<string, pito>>,
    Keys extends [string, ...string[]]
>(def: pito.Uobj<UKey, UVal>, ...keys: Keys)
    : pito.Uobj<UKey, PickObj<UVal, Keys[number]>>
export function PitoPick<T extends Record<string, pito>, Keys extends [string, ...string[]]>(def: pito.Obj<T>, ...keys: Keys)
    : pito.Obj<Pick<T, Keys[number]>>
export function PitoPick(def: pito.Obj<Record<string, pito>> | pito.Uobj<string, pito>, ...keys: string[]): pito {
    if ('anyOf' in def) {
        if (!keys.includes(def.$unionKey)) {
            throw new Error(`pito.Uobj not pick ${def.$unionKey}`)
        }
        let temp: PitoUnionObjBuilder<string, [string | number, pito.Obj<Record<string, pito>>][]> = pito.Uobj(def.$unionKey)
        for (const [k, v] of def.$unionMap.entries()) {
            // @ts-expect-error
            temp = temp.case(k, PitoPick(v, ...keys))
        }
        return temp.end()
    } else {
        return pito.Obj(
            Object.fromEntries(
                keys.map(v => {
                    const temp = def.properties[v]
                    return [v, temp]
                })
            )
        )
    }
    throw new Error(`unreachable type`)
}