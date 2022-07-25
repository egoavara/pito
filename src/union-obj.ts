// Derived : Union
import { pito } from "./pito.js"

export type UnionObjExtra = {}
export type UnionObjOption = {}
export type UnionObjSchema<Key extends string> = {
    discriminator: { propertyName: Key },
    oneOf: pito.Obj<Record<string, pito>>[]
}
export type PitoUnionObjBuilder<Key extends string, Cases extends Record<string, pito.Obj<Record<string, pito>>>> = {
    rawKey: Key
    rawCases: Cases
    case<NewCase extends string, NewObj extends Record<string, pito>>(ncase: NewCase, obj: NewObj)
        : PitoUnionObjBuilder<Key, Cases & Record<NewCase, pito.Obj<NewObj & Record<Key, pito.Lit<NewCase>>>>>
    end(): PitoUnionObj<Key, Cases[keyof Cases]>
}
export type PitoUnionObj<Key extends string, Unions extends pito> = pito<pito.Raw<Unions>, pito.Type<Unions>, UnionObjSchema<Key>, UnionObjOption, UnionObjExtra>
export const PitoUnionObj = <Key extends string>(key: Key): PitoUnionObjBuilder<Key, {}> => {
    return {
        rawKey: key,
        rawCases: {},
        case(ncase, obj) {
            if(Object.hasOwn(this.rawCases, ncase)){
                throw new Error(`already has key ${ncase}`)
            }
            // @ts-expect-error
            this.rawCases[ncase] = obj
            return this as any
        },
        // @ts-expect-error
        end() {
            const oneOf = Object.entries(this.rawCases).map(([k, v]) => {
                return pito.Obj(Object.assign({}, v, { [key]: pito.Lit(k) }))
            })
            return {
                discriminator: { propertyName: key },
                oneOf,
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
                        discriminator: { propertyName: key },
                        oneOf: this.oneOf.map((v) => v.$strict())
                    }
                },
                $bypass() {
                    return this.oneOf.findIndex((v) => !v.$bypass()) === -1
                },
            }
        },
    }
}