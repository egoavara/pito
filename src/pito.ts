export * from './arr.js'
export * from "./impl/index.js"
export * from './modifier.js'
export * from './primitives.js'
export * from './std-types.js'

import { PitoArr } from './arr.js'
import { PitoDefineBuilder } from './define.js'
import { PitoEnums } from './enums.js'
import { PitoMediaType } from "./media-type.js"
import { PitoOpt } from './modifier.js'
import { PitoObj } from "./obj.js"
import { PitoOmit } from "./omit.js"
import { PitoPick } from './pick.js'
import { PitoAny, PitoBool, PitoInt, PitoLit, PitoNul, PitoNum, PitoRegex, PitoStr } from './primitives.js'
import { PitoRecord } from "./record.js"
import { PitoDate, PitoDatetime, PitoDuration, PitoEmail, PitoHostname, PitoTime, PitoUrl, PitoUUID } from './std-types.js'
import { PitoTuple } from "./tuple.js"
import { PitoUnion, PitoUnionLit, PitoUnionObj } from "./union.js"


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
export namespace pito {
    export function isPito(data: any): data is pito {
        return typeof data === 'object' && '$unwrap' in data && '$wrap' in data && '$strict' in data && '$bypass' in data
    }
    export type Raw<T extends pito> = PitoRaw<T>
    export type Type<T extends pito> = PitoType<T>
    export type MapRaw<T extends [...pito[]]> = {
        [_ in keyof T]: T[_] extends pito ? pito.Raw<T[_]> : never
    }
    export type MapType<T extends [...pito[]]> = {
        [_ in keyof T]: T[_] extends pito ? pito.Type<T[_]> : never
    }
    export type Strict<T extends pito> = ReturnType<T['$strict']>
    // utils
    export function wrap<T extends pito>(t: T, data: Type<T>): Raw<T> {
        return t.$wrap(data)
    }
    export function unwrap<T extends pito>(t: T, data: Raw<T>): Type<T> {
        return t.$unwrap(data)
    }
    export function strict<T extends pito>(t: T,): PitoSchema<T> & PitoOption<T> {
        return t.$strict()
    }
    //
    // Primitives
    export type Any = PitoAny
    export const Any = PitoAny
    export type Nul = PitoNul
    export const Nul = PitoNul
    export type Lit<L extends string | number> = PitoLit<L>
    export const Lit = PitoLit
    export type Bool = PitoBool
    export const Bool = PitoBool
    export type Num = PitoNum
    export const Num = PitoNum
    export type Str = PitoStr
    export const Str = PitoStr
    export type Int = PitoInt
    export const Int = PitoInt
    export type Regex<Pattern extends string = string> = PitoRegex<Pattern>
    export const Regex = PitoRegex
    // Omit
    export type Omit<O, Keys extends string> = PitoOmit<O, Keys>
    export const Omit = PitoOmit
    // Pick
    export type Pick<O, Keys extends string> = PitoPick<O, Keys>
    export const Pick = PitoPick
    // Modifier
    export type Opt<T extends pito> = PitoOpt<T>
    export const Opt = PitoOpt
    // Enum
    export type Enums<E extends TSRecord<string, string | number>> = PitoEnums<E>
    export const Enums = PitoEnums
    // Union
    export const ULit = PitoUnionLit
    export type Uobj<Key extends string, Union extends pito> = PitoUnionObj<Key, Union>
    export const Uobj = PitoUnionObj
    export const Union = PitoUnion
    // Media
    export type MediaType = PitoMediaType
    export const MediaType = PitoMediaType
    // Derived
    export type Obj<Properties extends TSRecord<string, pito>> = PitoObj<Properties>
    export const Obj = PitoObj
    export type Arr<Items extends pito> = PitoArr<Items>
    export const Arr = PitoArr
    export type Tuple<Items extends [...pito[]]> = PitoTuple<Items>
    export const Tuple = PitoTuple
    export type Record<Value extends pito> = PitoRecord<Value>
    export const Record = PitoRecord
    // Std-Types
    export type Date = PitoDate
    export const Date = PitoDate
    export type Datetime = PitoDatetime
    export const Datetime = PitoDatetime
    export type Duration = PitoDuration
    export const Duration = PitoDuration
    export type Time = PitoTime
    export const Time = PitoTime
    export type Url = PitoUrl
    export const Url = PitoUrl
    export type UUID = PitoUUID
    export const UUID = PitoUUID
    export type Email = PitoEmail
    export const Email = PitoEmail
    export type Hostname = PitoHostname
    export const Hostname = PitoHostname
    // custom type
    export const define = PitoDefineBuilder.create
}



