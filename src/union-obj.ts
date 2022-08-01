// Derived : Union
import { pito } from "./pito.js"
import { PitoObj } from "./obj.js"
import { PitoLit } from "./primitives.js"

export type UnionObjExtra = {}
export type UnionObjOption = {}
export type UnionObjSchema<Key extends string> = {
    discriminator: { propertyName: Key },
    oneOf: PitoObj<Record<string, pito>>[]
}
export type PitoUnionObjBuilder<Key extends string, Cases extends Record<string, PitoObj<Record<string, pito>>>> = {
    rawKey: Key
    rawCases: Cases
    case<NewCase extends string, NewObj extends Record<string, pito>>(ncase: NewCase, obj: NewObj)
        : PitoUnionObjBuilder<Key, Cases & Record<NewCase, PitoObj<NewObj & Record<Key, PitoLit<NewCase>>>>>
    end(): PitoUnionObj<Key, Cases[keyof Cases]>
}
export type PitoUnionObj<Key extends string, Unions extends pito> = pito<pito.Raw<Unions>, pito.Type<Unions>, UnionObjSchema<Key>, UnionObjOption, UnionObjExtra>
export const PitoUnionObj = <Key extends string>(key: Key): PitoUnionObjBuilder<Key, {}> => {
    return {
        rawKey: key,
        rawCases: {},
        case(ncase, obj) {
            if (Object.hasOwn(this.rawCases, ncase)) {
                throw new Error(`already has key ${ncase}`)
            }
            // @ts-expect-error
            this.rawCases[ncase] = pito.Obj(Object.assign({}, obj, { [this.rawKey]: pito.Lit(ncase) }))
            return this as any
        },
        // @ts-expect-error
        end() {
            const modItemsMap = this.rawCases
            return {
                discriminator: { propertyName: key },
                oneOf: Object.values(this.rawCases),
                $wrap(raw) {
                    // @ts-expect-error
                    return modItemsMap[raw[key]].$wrap(raw)
                },
                $unwrap(raw) {
                    // @ts-expect-error
                    return modItemsMap[raw[key]].$unwrap(raw)
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