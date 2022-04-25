import { pito } from "./pito.js"

type ParseEnums<Enums extends Record<string, string | number>> = {
    [K in keyof Enums]:
    Enums[K] extends string
    ? Enums[K]
    : Enums[K] extends number
    ? Enums[K]
    : never
}[keyof Enums]

type ParseValues<Enums extends Record<string, string | number>> = Enums[keyof Enums]

// Enums

export type EnumsOption = {}
export type EnumsSchema<Enums extends Record<string, string | number>> = {
    enum: (ParseEnums<Enums>)[]
}
export type PitoEnums<Enums extends Record<string, string | number>> = pito<string | number, ParseValues<Enums>, EnumsSchema<Enums>, EnumsOption>
export const PitoEnums = <Enum extends Record<string, string | number>>(e: Enum, option?: EnumsOption): PitoEnums<Enum> => {
    const enums = Object.entries(e)
        .filter(([k, v]) => isNaN(k as any))
        .map(([k, v]) => {
            switch (typeof v) {
                case 'string':
                    return v
                case 'number':
                    return v
                default:
                    throw new Error(`enum has { ${k} : ${v} }, not supported value type`)
            }
        })
        .filter(v => v !== undefined)
    return {
        enum: enums as any,
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw as ParseValues<Enum> },
        $strict() {
            return {
                enum: this.enum,
            }
        },
        ...(option ?? {})
    }
}
