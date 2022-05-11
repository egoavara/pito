

// Derived : Union

import { pito } from "./pito.js"

export type ParsePitoUnionObj<Key extends string, Items> =
    Items extends [[infer K, infer V], ...infer Left]
    ? (
        K extends string | number
        ? V extends pito.Obj<infer InnerV>
        ? pito.Obj<InnerV & { [_ in Key]: pito.Lit<K> }>
        : never
        : never
    ) | ParsePitoUnionObj<Key, Left>
    : never

export type UnionObjOption = {}
export type UnionObjSchema = { anyOf: any[], }
export type PitoUnionObjBuilder<Key extends string, Cases extends [...[string | number, pito.Obj<Record<string, pito>>][]]> = {
    rawKey: Key
    rawCases: Cases
    case<NewCase extends string | number, NewObj extends pito.Obj<Record<string, pito>>>(ncase: NewCase, obj: NewObj)
        : PitoUnionObjBuilder<Key, [...Cases, [NewCase, NewObj]]>
    end(): PitoUnionObj<Key, ParsePitoUnionObj<Key, Cases>>
}
export type PitoUnionObj<Key extends string, Unions extends pito> =
    pito<
        pito.Raw<Unions>,
        pito.Type<Unions>,
        UnionObjSchema,
        UnionObjOption
    >

export const PitoUnionObj = <Key extends string>(key: Key): PitoUnionObjBuilder<Key, []> => {
    return {
        rawKey: key,
        rawCases: [],
        case(ncase, obj) {
            // @ts-expect-error
            this.rawCases.push([ncase, obj])
            return this as any
        },
        // @ts-expect-error
        end() {
            const modItemsMap = new Map<number | string, pito.Obj<Record<string, pito>>>()
            // @ts-expect-error
            for (const [k, v] of this.rawCases) {
                const props: Record<string, pito> = {}
                // @ts-expect-error
                for (const k in v.properties) {
                    // @ts-expect-error
                    props[k] = v.properties[k]
                }
                props[key] = pito.Lit(k)
                modItemsMap.set(k, pito.Obj(props))
            }

            return {
                anyOf: Array.from(modItemsMap.values()),
                $wrap(raw) {
                    // @ts-expect-error
                    return modItemsMap.get(raw[key]).$wrap(raw)
                },
                $unwrap(raw) {
                    // @ts-expect-error
                    return modItemsMap.get(raw[key]).$unwrap(raw)
                },
                $strict() {
                    return {
                        anyOf: this.anyOf.map(v => v.$strict())
                    }
                },
                $bypass() {
                    return this.anyOf.findIndex(v => !v.$bypass()) === -1
                },
                $isAssignableRaw(data) {
                    if (typeof data === 'object' && key in data) {
                        return modItemsMap.get(data[key])?.$isAssignableRaw(data)
                    }
                    return false
                }
            }
        },

    }
}




export type UnionLitSchema = { enums: (string | number)[] }

export type PitoUnionLit<Lits extends string | number> =
    pito<
        Lits,
        Lits,
        UnionLitSchema,
        {}
    >
export const PitoUnionLit = <Lits extends [...(string | number)[]]>(...lits: Lits): PitoUnionLit<Lits[number]> => {
    return {
        enums: lits,
        $strict() {
            return { enums: lits }
        },
        $wrap(data) {
            return data
        },
        $unwrap(raw) {
            return raw
        },
        $bypass() {
            return true
        },
        $isAssignableRaw(data) {
            return lits.indexOf(data) !== -1
        }
    }
}


export type UnionSchema = { anyOf: any[], }
export type PitoUnion<Elems extends [...pito[]]> =
    pito<
        pito.Raw<Elems[number]>,
        pito.Type<Elems[number]>,
        UnionSchema,
        {}
    >
export const PitoUnion = <Elems extends [pito, ...pito[]]>(elems: Elems): PitoUnion<Elems> => {
    return {
        anyOf: elems,
        $wrap(data) {
            const result = elems.find(v => v.$isAssignableRaw(data))?.$wrap(data)
            if (result === undefined) {
                throw new Error(`union wrap unassignable`)
            }
            return result
        },
        $unwrap(raw) {
            const result = elems.find(v => v.$isAssignableRaw(raw))?.$unwrap(raw)
            if (result === undefined) {
                throw new Error(`union unwrap unassignable`)
            }
            return result
        },
        $bypass() {
            return elems.findIndex(v => !v.$bypass()) !== -1
        },
        $strict() {
            return {
                anyOf: elems.map(v => pito.strict(v))
            }
        },
        $isAssignableRaw(data) {
            return elems.findIndex(v => v.$isAssignableRaw(data)) !== -1
        }
    }
}