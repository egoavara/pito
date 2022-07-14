import { pito, plugin } from "./pito.js";


export type UnionLitSchema = { type: 'string' | 'number', enums: (string | number)[] }

export type PitoUnionLit<Lits extends string | number> = pito<Lits, Lits, UnionLitSchema, {}>;
export const PitoUnionLit = <Lits extends [...(string | number)[]]>(...lits: Lits): PitoUnionLit<Lits[number]> => {
    const temp = typeof lits[0] === 'string' ? 'string' : 'number'
    return {
        type : temp,
        enums: lits,
        $strict() {
            return { type: temp, enums: lits }
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