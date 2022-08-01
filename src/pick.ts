import { pito } from "./pito.js"
import { PitoObj } from "./obj.js"
import { PitoUnionObj } from "./union-obj.js"
export type PickObj<O, Keys extends string> = O extends PitoObj<infer Def> ? PitoObj<Pick<Def, Keys>> : never

export type PitoPick<Obj, Keys extends string> =
    Obj extends PitoObj<infer O>
    ? PitoObj<Pick<O, Keys>>
    : Obj extends PitoUnionObj<infer K, infer V>
    ? PitoUnionObj<K, PickObj<V, Keys>>
    : never
export function PitoPick<
    UKey extends string,
    UVal extends pito,
    Keys extends [string, ...string[]]
>(def: PitoUnionObj<UKey, UVal>, ...keys: Keys)
    : PitoUnionObj<UKey, PickObj<UVal, Keys[number]>>
export function PitoPick<T extends Record<string, pito>, Keys extends [string, ...string[]]>(def: PitoObj<T>, ...keys: Keys)
    : PitoObj<Pick<T, Keys[number]>>
export function PitoPick(def: PitoObj<Record<string, pito>> | PitoUnionObj<string, any>, ...keys: string[]): pito {
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