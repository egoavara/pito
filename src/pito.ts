export * from "./impl/index.js"
export * from './derived.js'
export * from './modifier.js'
export * from './primitives.js'
export * from './std-types.js'

import { PitoDefineBuilder } from './define.js'
import { PitoArr, PitoObj, PitoUnionObj } from './derived.js'
import { PitoEnums } from './enums.js'
import { PitoOpt } from './modifier.js'
import { PitoAny, PitoBool, PitoInt, PitoLit, PitoNul, PitoNum, PitoRegex, PitoStr } from './primitives.js'
import { PitoDate, PitoDatetime, PitoDuration, PitoTime, PitoUrl, PitoUUID } from './std-types.js'

export type pito<Raw = any, Type = any, Schema extends Record<string, any> = any, Option extends Record<string, any> = any, Extras extends Record<string, any> = {}> = {
    $unwrap(this: pito<Raw, Type, Schema, Option, Extras>, raw: Raw): Type
    $wrap(this: pito<Raw, Type, Schema, Option, Extras>, raw: Type): Raw
    $strict(this: pito<Raw, Type, Schema, Option, Extras>): Schema & Partial<Option>,
} & { [_ in keyof Schema]: Schema[_] } & { [_ in keyof Option]?: Option[_] } & { [_ in keyof Extras]: Extras[_] }

export type PitoRaw<T> = T extends pito<infer Raw, any, any, any> ? Raw : never
export type PitoType<T> = T extends pito<any, infer Type, any, any> ? Type : never
export type PitoSchema<T> = T extends pito<any, any, infer Schema, any> ? Schema : never
export type PitoOption<T> = T extends pito<any, any, any, infer Option> ? Option : never

export namespace pito {
    // 
    export type Raw<T extends pito> = PitoRaw<T>
    export type Type<T extends pito> = PitoType<T>
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
    export type Lit<L extends string | number | boolean> = PitoLit<L>
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
    export type Enums<E extends Record<string, string | number>> = PitoEnums<E>
    export const Enums = PitoEnums
    // Derived
    export type Uobj<Key extends string, Items extends Record<string, PitoObj<Record<string, pito>>>> = PitoUnionObj<Key, Items>
    export const Uobj = PitoUnionObj
    export type Obj<Properties extends Record<string, pito>> = PitoObj<Properties>
    export const Obj = PitoObj
    export type Arr<Items extends pito> = PitoArr<Items>
    export const Arr = PitoArr
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
    // custom type
    export const define = PitoDefineBuilder.create
}



