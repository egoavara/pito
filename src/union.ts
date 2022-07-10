import { pito, plugin } from "./pito.js"

export type UnionSchema = { anyOf: any[], }
export type PitoUnion<Elems extends pito> =
    pito<
        pito.Raw<Elems>,
        pito.Type<Elems>,
        UnionSchema,
        {}
    >
export type Elem = {
    define: pito
    checkWrap(data: any): boolean
    checkUnwrap(raw: any): boolean
}
export const PitoUnion = <Elems extends [Elem] | [...Elem[]]>(...elems: Elems): PitoUnion<Elems[number]['define']> => {
    return {
        anyOf: elems.map(v => v.define),
        $typeof: 'union',
        $args: elems.map(v => { return v.define }),
        $wrap(data) {
            const result = elems.find(v => v.checkWrap(data))?.define.$wrap(data)
            if (result === undefined) {
                throw new Error(`union wrap unassignable`)
            }
            return result
        },
        $unwrap(raw) {
            const result = elems.find(v => v.checkUnwrap(raw))?.define.$unwrap(raw)
            if (result === undefined) {
                throw new Error(`union unwrap unassignable`)
            }
            return result
        },
        $bypass() {
            return elems.findIndex(v => !v.define.$bypass()) !== -1
        },
        $strict() {
            return {
                anyOf: elems.map(v => pito.strict(v.define))
            }
        },
    }
}