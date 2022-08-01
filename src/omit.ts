import { PitoObj } from "./obj.js"
import { pito } from "./pito.js"
import { PitoUnionObj } from "./union-obj.js"
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
export function PitoOmit<T extends Record<string, pito>, Keys extends [string, ...string[]]>(def: PitoObj<T>, ...keys: Keys)
    : PitoObj<Omit<T, Keys[number]>>
export function PitoOmit(def: PitoObj<Record<string, pito>> | PitoUnionObj<string, pito>, ...keys: string[]): pito {
    if ('discriminator' in def) {
        const key = def.discriminator.propertyName
        if (keys.includes(key)) {
            throw new Error(`pito.Uobj omit required field ${key}`)
        }
        const keysIncludeKey = keys
        let temp = pito.Uobj(key)
        for (const v of def.oneOf) {
            temp = temp.case(
                v.properties[key].const,
                // @ts-expect-error
                Object.fromEntries(Object.entries(v.properties)
                    .filter(([k, v]) => {
                        return !keysIncludeKey.includes(k)
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
                Object.entries(def.properties).filter(([k, v]) => !keys.includes(k))
            )
        )
    }
    throw new Error(`unreachable type`)
}