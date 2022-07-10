import { pito, plugin } from "./pito.js"


export type UnionLitSchema = { enums: (string | number)[] }

export type PitoUnionLit<Lits extends string | number> = pito<Lits, Lits, UnionLitSchema, {}>
export const PitoUnionLit = <Lits extends [...(string | number)[]]>(...lits: Lits): PitoUnionLit<Lits[number]> => {
    return {
        enums: lits,
        $typeof: 'union',
        $args: lits.map(v => {
            if (typeof v === 'string') {
                return pito.Lit(v)
            } else if (typeof v === 'number') {
                return pito.Lit(v)
            } else {
                throw new Error(`unexpected PitoUnionLit elem : ${v}`)
            }
        }),
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
    }
}