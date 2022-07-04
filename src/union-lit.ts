import { extendPlugin, pito } from "./pito.js";


export type UnionLitSchema = { enums: (string | number)[] }

export type PitoUnionLit<Lits extends string | number> = pito<Lits, Lits, UnionLitSchema, {}>;
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
    }
}

//
extendPlugin('Ulit', PitoUnionLit);
declare module './pito' {
    interface PitoPlugin {
        Ulit: typeof PitoUnionLit
    }
    namespace pito {
        type Ulit<Lits extends string | number> = PitoUnionLit<Lits>
    }
}