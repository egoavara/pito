import { pito, plugin } from "./pito.js"


export type UnionLitSchema = { type: 'string' | 'number', enums: (string | number)[] }

export type PitoUnionLit<Lits extends string | number> = pito<Lits, Lits, UnionLitSchema, {}>

export function PitoUnionLit<Lits extends [...number[]]>(...lits: Lits): PitoUnionLit<Lits[number]>;
export function PitoUnionLit<Lits extends [...string[]]>(...lits: Lits): PitoUnionLit<Lits[number]>;
export function PitoUnionLit<Lits extends [...(string | number)[]]>(...lits: Lits): PitoUnionLit<Lits[number]> {
    const type = typeof lits[0] === 'string' ? 'string' : 'number'
    return {
        type,
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
            return { type, enums: lits }
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