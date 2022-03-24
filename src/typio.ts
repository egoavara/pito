import { TypioBool, TypioInt, TypioLit, TypioNum, TypioRegex, TypioStr } from './primitives.js'
import { TypioDate, TypioDatetime, TypioUrl } from './std-types.js'
import { TypioOpt } from './modifier.js'
import { TypioArr, TypioObj } from './derived.js'

export type typio<Raw = any, Type = any, Schema extends Record<string, any> = any, Option extends Record<string, any> = any> = {
    $symbol: string,
    $unwrap(this: typio<Raw, Type, Schema, Option>, raw: Raw): Type
    $wrap(this: typio<Raw, Type, Schema, Option>, raw: Type): Raw
    $strict(this: typio<Raw, Type, Schema, Option>): Schema & Option,
} & { [_ in keyof Schema]: Schema[_] } & { [_ in keyof Option]: Option[_] }

export type TypioRaw<T> = T extends typio<infer Raw, any, any, any> ? Raw : never
export type TypioType<T> = T extends typio<any, infer Type, any, any> ? Type : never
export type TypioSchema<T> = T extends typio<any, any, infer Schema, any> ? Schema : never
export type TypioOption<T> = T extends typio<any, any, any, infer Option> ? Option : never

export namespace typio {
    // 
    export type Raw<T extends typio> = TypioRaw<T>
    export type Type<T extends typio> = TypioType<T>
    // utils
    export function wrap<T extends typio>(t: T, data: Type<T>): Raw<T> {
        return t.$wrap(data)
    }
    export function unwrap<T extends typio>(t: T, data: Raw<T>): Type<T> {
        return t.$unwrap(data)
    }
    export function strict<T extends typio>(t: T,): TypioSchema<T> & TypioOption<T> {
        return t.$strict()
    }
    //
    // Primitives
    export const lit = TypioLit
    export const bool = TypioBool
    export const num = TypioNum
    export const str = TypioStr
    export const int = TypioInt
    export const regex = TypioRegex
    // Modifier
    export const opt = TypioOpt
    // Derived
    export const obj = TypioObj
    export const arr = TypioArr
    // Std-Types
    // TODO : export const time = TypioTime
    export const date = TypioDate
    export const datetime = TypioDatetime
    export const url = TypioUrl
}

export * from './derived.js'
export * from './std-types.js'
export * from './modifier.js'
export * from './primitives.js'
