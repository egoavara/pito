export * from "./impl/index.js"
export * from './derived.js'
export * from './modifier.js'
export * from './primitives.js'
export * from './std-types.js'

import { PitoDefineBuilder } from './define.js'
import { PitoObj } from "./derived-obj.js"
import { PitoArr, PitoRecord, PitoTuple } from './derived.js'
import { PitoEnums } from './enums.js'
import { PitoOpt } from './modifier.js'
import { PitoAny, PitoBool, PitoInt, PitoLit, PitoNul, PitoNum, PitoRegex, PitoStr } from './primitives.js'
import { PitoDate, PitoDatetime, PitoDuration, PitoEmail, PitoHostname, PitoTime, PitoUrl, PitoUUID } from './std-types.js'
import { PitoUnionObj } from "./union.js"


export type pito<Raw = any, Type = any, Schema extends Record<string, any> = any, Option extends Record<string, any> = any, Extras extends Record<string, any> = {}> = {
    $unwrap(this: pito<Raw, Type, Schema, Option, Extras>, raw: Raw): Type
    $wrap(this: pito<Raw, Type, Schema, Option, Extras>, data: Type): Raw
    $strict(this: pito<Raw, Type, Schema, Option, Extras>): Schema & Partial<Option>,
    $bypass(this: pito<Raw, Type, Schema, Option, Extras>): boolean
    $isAssignableRaw(this: pito<Raw, Type, Schema, Option, Extras>, data: any) : boolean
} & { [_ in keyof Schema]: Schema[_] } & { [_ in keyof Option]?: Option[_] } & { [_ in keyof Extras]: Extras[_] }

export type PitoRaw<T> = T extends pito<infer Raw, any, any, any> ? Raw : never
export type PitoType<T> = T extends pito<any, infer Type, any, any> ? Type : never
export type PitoSchema<T> = T extends pito<any, any, infer Schema, any> ? Schema : never
export type PitoOption<T> = T extends pito<any, any, any, infer Option> ? Option : never
export type TSRecord<K extends keyof any, V> = Record<K, V>
export namespace pito {
    export function isPito(data : any):data is pito{
        return typeof data === 'object' && '$unwrap' in data && '$wrap' in data && '$strict' in data && '$bypass' in data && '$isAssignableRaw' in data
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
    // Modifier
    export type Opt<T extends pito> = PitoOpt<T>
    export const Opt = PitoOpt
    // Enum
    export type Enums<E extends TSRecord<string, string | number>> = PitoEnums<E>
    export const Enums = PitoEnums
    // Union
    export const Uobj = PitoUnionObj
    // Derived
    export type Obj<Properties extends TSRecord<string, pito>, AdditionalProperties extends boolean = false> = PitoObj<Properties, AdditionalProperties>
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



