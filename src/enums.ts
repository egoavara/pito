import { pito } from "./pito.js"

type ParseEnums<Enums extends Record<string, string | number>> = {
    [K in keyof Enums]:
    Enums[K] extends string
    ? { type: 'string', const: Enums[K] }
    : Enums[K] extends number
    ? { type: 'number', const: Enums[K] }
    : never
}[keyof Enums]

type ParseValues<Enums extends Record<string, string | number>> = Enums[keyof Enums]

// Enums

export type EnumsOption = {}
export type EnumsSchema<Enums extends Record<string, string | number>> = {
    anyOf: (ParseEnums<Enums>)[]
}
export const EnumProto: Partial<pito<string | number, string | number, EnumsSchema<Record<string, string | number>>, EnumsOption>> = {
    $wrap(raw) { return raw },
    $unwrap(raw) { return raw },
    $strict() {
        return {
            anyOf: this.anyOf,
        }
    },
}
export type PitoEnums<Enums extends Record<string, string | number>> = pito<string | number, ParseValues<Enums>, EnumsSchema<Enums>, EnumsOption>
export const PitoEnums = <Enum extends Record<string, string | number>>(e: Enum, option?: EnumsOption): PitoEnums<Enum> => {
    const anyOf = Object.entries(e)
        .filter(([k, v]) => isNaN(k as any))
        .map(([k, v]) => {
            switch (typeof v) {
                case 'string':
                    return { const: v }
                case 'number':
                    return { const: v }
                default:
                    return undefined
            }
        })
        .filter(v => v !== undefined)
    return Object.assign(Object.create(EnumProto), { anyOf }, option ?? {})
}
