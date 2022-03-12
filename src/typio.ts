import { TypioArray, TypioObject } from './derived.js'
import { TypioOption } from './modifier.js'
import { TypioBoolean, TypioLiteral, TypioNumber, TypioString } from './primitives.js'
import { TypioInteger, TypioRegex } from './std-primitives.js'
import { TypioDate, TypioDatetime, TypioUrl } from './std-types.js'

export const __name__ = 'typio'

export type typio<Raw = any, Type = any> = {
    $symbol: string,
    $type: Type
    $raw: Raw
    $unwrap(raw: Raw): Type
    $wrap(raw: Type): Raw
}

export type TypioRaw<T extends typio> = T['$raw']

export type TypioType<T extends typio> = T['$type']

export namespace typio {
    export type Raw<T extends typio> = T['$raw']
    export type Type<T extends typio> = T['$type']
    // utils
    export function wrap<T extends typio>(t: T, data: T['$type']): T['$raw'] {
        return t.$wrap(data)
    }
    export function unwrap<T extends typio>(t: T, data: T['$raw']): T['$type'] {
        return t.$unwrap(data)
    }
    // Primitives
    export const lit = TypioLiteral
    export const str = TypioString
    export const num = TypioNumber
    export const bool = TypioBoolean
    // Derived
    export const obj = TypioObject
    export const arr = TypioArray
    // Modifier
    export const opt = TypioOption
    // Std-Primitives
    export const int = TypioInteger
    export const regex = TypioRegex
    // Std-Types
    // TODO : export const time = TypioTime
    export const date = TypioDate
    export const datetime = TypioDatetime
    export const url = TypioUrl
}

export * from './primitives.js'
export * from './derived.js'
export * from './modifier.js'
export * from './std-primitives.js'
export * from './std-types.js'