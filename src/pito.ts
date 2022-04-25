export * from "./impl/index.js"
export * from './derived.js'
export * from './modifier.js'
export * from './primitives.js'
export * from './std-types.js'

import { PitoDefineBuilder } from './define.js'
import { PitoArr, PitoObj, PitoUnionObj } from './derived.js'
import { PitoEnums } from './enums.js'
import { PitoOpt } from './modifier.js'
import { PitoBool, PitoInt, PitoLit, PitoNul, PitoNum, PitoRegex, PitoStr } from './primitives.js'
import { PitoDate, PitoDatetime, PitoDuration, PitoTime, PitoUrl } from './std-types.js'

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
    export type nul = PitoNul
    export const nul = PitoNul
    export type lit<L extends string | number | boolean> = PitoLit<L>
    export const lit = PitoLit
    export type bool = PitoBool
    export const bool = PitoBool
    export type num = PitoNum
    export const num = PitoNum
    export type str = PitoStr
    export const str = PitoStr
    export type int = PitoInt
    export const int = PitoInt
    export type regex<Pattern extends string = string> = PitoRegex<Pattern>
    export const regex = PitoRegex
    // Modifier
    export type opt<T extends pito> = PitoOpt<T>
    export const opt = PitoOpt
    // Enum
    export type enums<E extends Record<string, string | number>> = PitoEnums<E>
    export const enums = PitoEnums
    // Derived
    export type uobj<Key extends string, Items extends Record<string, PitoObj<Record<string, pito>>>> = PitoUnionObj<Key, Items>
    export const uobj = PitoUnionObj
    export type obj<Properties extends Record<string, pito>> = PitoObj<Properties>
    export const obj = PitoObj
    export type arr<Items extends pito> = PitoArr<Items>
    export const arr = PitoArr
    // Std-Types
    export type date = PitoDate
    export const date = PitoDate
    export type datetime = PitoDatetime
    export const datetime = PitoDatetime
    export type duration = PitoDuration
    export const duration = PitoDuration
    export type time = PitoTime
    export const time = PitoTime
    export type url = PitoUrl
    export const url = PitoUrl
    // custom type
    export const define = PitoDefineBuilder.create
}



