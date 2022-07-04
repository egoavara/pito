export type pito<Raw = any, Type = any, Schema extends Record<string, any> = any, Option extends Record<string, any> = any, Extras extends Record<string, any> = any> = {
    $unwrap(this: pito<Raw, Type, Schema, Option, Extras>, raw: Raw): Type
    $wrap(this: pito<Raw, Type, Schema, Option, Extras>, data: Type): Raw
    $strict(this: pito<Raw, Type, Schema, Option, Extras>): Schema & Partial<Option>,
    $bypass(this: pito<Raw, Type, Schema, Option, Extras>): boolean
} & { [_ in keyof Schema]: Schema[_] } & { [_ in keyof Option]?: Option[_] } & { [_ in keyof Extras]: Extras[_] }

export type PitoRaw<T> = T extends pito<infer Raw, any, any, any> ? Raw : never
export type PitoType<T> = T extends pito<any, infer Type, any, any> ? Type : never
export type PitoSchema<T> = T extends pito<any, any, infer Schema, any> ? Schema : never
export type PitoOption<T> = T extends pito<any, any, any, infer Option> ? Option : never
export type TSRecord<K extends keyof any, V> = Record<K, V>
// export namespace pito {
//     // Primitives
//     // export type Any = PitoAny
//     // export const Any = PitoAny
//     // export type Nul = PitoNul
//     // export const Nul = PitoNul
//     // export type Lit<L extends string | number> = PitoLit<L>
//     // export const Lit = PitoLit
//     // export type Bool = PitoBool
//     // export const Bool = PitoBool
//     // export type Num = PitoNum
//     // export const Num = PitoNum
//     // export type Str = PitoStr
//     // export const Str = PitoStr
//     // export type Int = PitoInt
//     // export const Int = PitoInt
//     // export type Regex<Pattern extends string = string> = PitoRegex<Pattern>
//     // export const Regex = PitoRegex
//     // // Omit
//     // export type Omit<O, Keys extends string> = PitoOmit<O, Keys>
//     // export const Omit = PitoOmit
//     // // Pick
//     // export type Pick<O, Keys extends string> = PitoPick<O, Keys>
//     // export const Pick = PitoPick
//     // // Modifier
//     // export type Opt<T extends pito> = PitoOpt<T>
//     // export const Opt = PitoOpt
//     // // Enum
//     // export type Enums<E extends TSRecord<string, string | number>> = PitoEnums<E>
//     // export const Enums = PitoEnums
//     // // Union
//     // export const ULit = PitoUnionLit
//     // export type Uobj<Key extends string, Union extends pito> = PitoUnionObj<Key, Union>
//     // export const Uobj = PitoUnionObj
//     // export const Union = PitoUnion
//     // // Media
//     // export type MediaType = PitoMediaType
//     // export const MediaType = PitoMediaType
//     // // Derived
//     // export type Obj<Properties extends TSRecord<string, pito>> = PitoObj<Properties>
//     // export const Obj = PitoObj
//     // export type Arr<Items extends pito> = PitoArr<Items>
//     // export const Arr = PitoArr
//     // export type Tuple<Items extends [...pito[]]> = PitoTuple<Items>
//     // export const Tuple = PitoTuple
//     // export type Record<Value extends pito> = PitoRecord<Value>
//     // export const Record = PitoRecord
//     // // Std-Types
//     // export type Date = PitoDate
//     // export const Date = PitoDate
//     // export type Datetime = PitoDatetime
//     // export const Datetime = PitoDatetime
//     // export type Duration = PitoDuration
//     // export const Duration = PitoDuration
//     // export type Time = PitoTime
//     // export const Time = PitoTime
//     // export type Url = PitoUrl
//     // export const Url = PitoUrl
//     // export type UUID = PitoUUID
//     // export const UUID = PitoUUID
//     // export type Email = PitoEmail
//     // export const Email = PitoEmail
//     // export type Hostname = PitoHostname
//     // export const Hostname = PitoHostname
//     // // custom type
//     // export const define = PitoDefineBuilder.create
// }

const plugin: Record<string, any> = {
    wrap<T extends pito>(t: T, data: PitoType<T>): PitoRaw<T> {
        return t.$wrap(data)
    },
    unwrap<T extends pito>(t: T, data: PitoRaw<T>): PitoType<T> {
        return t.$unwrap(data)
    },
    strict<T extends pito>(t: T,): PitoSchema<T> & PitoOption<T> {
        return t.$strict()
    },
}
export function extendPlugin(name: string, value: any) {
    plugin[name] = value
}
export interface PitoPlugin {
    wrap<T extends pito>(t: T, data: PitoType<T>): PitoRaw<T>;
    unwrap<T extends pito>(t: T, data: PitoRaw<T>): PitoType<T>;
    strict<T extends pito>(t: T,): PitoSchema<T> & PitoOption<T>;
}
export namespace pito {
    export type Raw<T extends pito> = PitoRaw<T>
    export type Type<T extends pito> = PitoType<T>
    export type MapRaw<T extends [...pito[]]> = {
        [_ in keyof T]: T[_] extends pito ? pito.Raw<T[_]> : never
    }
    export type MapType<T extends [...pito[]]> = {
        [_ in keyof T]: T[_] extends pito ? pito.Type<T[_]> : never
    }
    export type Strict<T extends pito> = ReturnType<T['$strict']>
}
export const pito: PitoPlugin = Object.freeze(Object.create(plugin))

export * from './primitives.js'
export * from './modifier-opt.js'
export * from './enums.js'
export * from './arr.js'
export * from './obj.js'
export * from './tuple.js'
export * from './record.js'
export * from './union-lit.js'
export * from './union-obj.js'
export * from './union.js'
export * from './omit.js'
export * from './pick.js'
export * from './std-date.js'
export * from './std-datetime.js'
export * from './std-email.js'
export * from './std-hostname.js'
export * from './std-url.js'
export * from './std-uuid.js'