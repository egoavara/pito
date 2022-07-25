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
    UVal extends pito,
    Keys extends [string, ...string[]]
>(def: pito.Uobj<UKey, UVal>, ...keys: Keys)
    : pito.Uobj<UKey, PickObj<UVal, Keys[number]>>
export function PitoPick<T extends Record<string, pito>, Keys extends [string, ...string[]]>(def: pito.Obj<T>, ...keys: Keys)
    : pito.Obj<Pick<T, Keys[number]>>
export function PitoPick(def: pito.Obj<Record<string, pito>> | pito.Uobj<string, any>, ...keys: string[]): pito {
    if ('discriminator' in def) {
        const key = def.discriminator.propertyName
        if (!keys.includes(key)) {
            throw new Error(`pito.Uobj not pick ${key}`)
        }
        const keysExlcudeKey = keys.filter(v => v !== key)
        let temp = pito.Uobj(key)
        for (const v of def.oneOf) {
            temp = temp.case(
                v.properties[key].const,
                // @ts-expect-error
                Object.fromEntries(Object.entries(v.properties)
                    .filter(([k, v]) => {
                        return keysExlcudeKey.includes(k)
                    })
                    .map(([k, v]) => {
                        return [k, v]
                    })
                )
            )
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