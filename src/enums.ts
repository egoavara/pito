import { pito, plugin } from "./pito.js"

export type ParseEnums<Enums extends Record<string, string | number>> = {
    [K in keyof Enums]:
    Enums[K] extends string
    ? Enums[K]
    : Enums[K] extends number
    ? Enums[K]
    : never
}[keyof Enums]

export type ParseValues<Enums extends Record<string, string | number>> = Enums[keyof Enums]

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

    const eachTypeof = Array.from(new Set(enums.map(v => typeof v)))
    if (eachTypeof.length !== 1) {
        throw new Error(`pito.Enums, only allow single typeof enum :${eachTypeof}`)
    }
    return {
        type: eachTypeof[0],
        enum: enums as any,
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw as ParseValues<Enum> },
        $strict() {
            return {
                type: eachTypeof[0],
                enum: this.enum,
            }
        },
        $bypass(this) { return true },
        ...(option ?? {})
    }
}

//
Object.defineProperty(plugin, 'Enums', { value: PitoEnums, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Enums: typeof PitoEnums
    }
    namespace pito {
        type Enums<E extends TSRecord<string, string | number>> = PitoEnums<E>
    }
}