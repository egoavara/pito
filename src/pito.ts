import { PitoArr } from './arr.js'
import { PitoEnums } from './enums.js'
import { PitoExtends } from './extends.js'
import { PitoOpt } from './modifier-opt.js'
import { PitoObj } from './obj.js'
import { PitoOmit } from './omit.js'
import { PitoPick } from './pick.js'
import { PitoAny, PitoBool, PitoInt, PitoLit, PitoNul, PitoNum, PitoRegex, PitoStr } from './primitives.js'
import { PitoRecord } from './record.js'
import { PitoDate } from './std-date.js'
import { PitoDatetime } from './std-datetime.js'
import { PitoEmail } from './std-email.js'
import { PitoHostname } from './std-hostname.js'
import { PitoUrl } from './std-url.js'
import { PitoUUID } from './std-uuid.js'
import { PitoTuple } from './tuple.js'
import { PitoUnionLit } from './union-lit.js'
import { PitoUnionObj, UnionObjSchema } from './union-obj.js'
import { PitoUnion } from './union.js'

export type pito<Raw = any, Type = any, Schema extends Record<string, any> = any, Option extends Record<string, any> = any, Extras extends Record<string, any> = any> = {
    $wrap(this: pito<Raw, Type, Schema, Option, Extras>, data: Type): Raw
    $unwrap(this: pito<Raw, Type, Schema, Option, Extras>, raw: Raw): Type
    $strict(this: pito<Raw, Type, Schema, Option, Extras>): Schema & Partial<Option>
    $bypass(this: pito<Raw, Type, Schema, Option, Extras>): boolean
} & ReflectType & { [_ in keyof Schema]: Schema[_] } & { [_ in keyof Option]?: Option[_] } & { [_ in keyof Extras]: Extras[_] }

export type ReflectType =
    | { $typeof: 'any' }
    | { $typeof: 'literal', $const: any }
    | { $typeof: 'undefined' }
    | { $typeof: 'null' }
    | { $typeof: 'boolean' }
    | { $typeof: 'number' }
    | { $typeof: 'string' }
    | { $typeof: 'bigint' }
    | { $typeof: 'array', $elem: pito }
    | { $typeof: 'tuple', $elem: pito[] }
    | { $typeof: 'object', $elem: Record<string, pito> }
    | { $typeof: 'record', $elem: pito }
    | { $typeof: 'class', $constructor: { new(...args: any[]): any } }
    | { $typeof: 'union', $args: pito[] }
    | { $typeof: 'intersect', $args: pito[] }

export type PitoRaw<T> = T extends pito<infer Raw, any, any, any> ? Raw : never
export type PitoType<T> = T extends pito<any, infer Type, any, any> ? Type : never
export type PitoSchema<T> = T extends pito<any, any, infer Schema, any> ? Schema : never
export type PitoOption<T> = T extends pito<any, any, any, infer Option> ? Option : never
export type TSRecord<K extends keyof any, V> = Record<K, V>

export const plugin: Record<string, any> = {
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
export interface PitoPlugin {
    wrap<T extends pito>(t: T, data: PitoType<T>): PitoRaw<T>
    unwrap<T extends pito>(t: T, data: PitoRaw<T>): PitoType<T>
    strict<T extends pito>(t: T,): PitoSchema<T> & PitoOption<T>
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

// ============================================================================================================================================
export * from './primitives.js'
Object.defineProperty(plugin, 'Any', { value: PitoAny, configurable: false, writable: false })
Object.defineProperty(plugin, 'Nul', { value: PitoNul, configurable: false, writable: false })
Object.defineProperty(plugin, 'Lit', { value: PitoLit, configurable: false, writable: false })
Object.defineProperty(plugin, 'Bool', { value: PitoBool, configurable: false, writable: false })
Object.defineProperty(plugin, 'Num', { value: PitoNum, configurable: false, writable: false })
Object.defineProperty(plugin, 'Str', { value: PitoStr, configurable: false, writable: false })
Object.defineProperty(plugin, 'Int', { value: PitoInt, configurable: false, writable: false })
Object.defineProperty(plugin, 'Regex', { value: PitoRegex, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Any: typeof PitoAny
        Nul: typeof PitoNul
        Lit: typeof PitoLit
        Bool: typeof PitoBool
        Num: typeof PitoNum
        Str: typeof PitoStr
        Int: typeof PitoInt
        Regex: typeof PitoRegex
    }
    namespace pito {
        type Any = PitoAny
        type Nul = PitoNul
        type Lit<L extends string | number> = PitoLit<L>
        type Bool = PitoBool
        type Num = PitoNum
        type Str = PitoStr
        type Int = PitoInt
        type Regex<Pattern extends string = string> = PitoRegex<Pattern>
    }
}
// ============================================================================================================================================
export * from './modifier-opt.js'
Object.defineProperty(plugin, 'Opt', { value: PitoOpt, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Opt: typeof PitoOpt
    }
    namespace pito {
        type Opt<T extends pito> = PitoOpt<T>
    }
}
// ============================================================================================================================================
export * from './enums.js'
Object.defineProperty(plugin, 'Enums', { value: PitoEnums, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Enums: typeof PitoEnums
    }
    namespace pito {
        type Enums<E extends TSRecord<string, string | number>> = PitoEnums<E>
    }
}
// ============================================================================================================================================
export * from './arr.js'
Object.defineProperty(plugin, 'Arr', { value: PitoArr, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Arr: typeof PitoArr
    }
    namespace pito {
        type Arr<Items extends pito> = PitoArr<Items>
    }
}
// ============================================================================================================================================
export * from './obj.js'
Object.defineProperty(plugin, 'Obj', { value: PitoObj, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Obj: typeof PitoObj
    }
    namespace pito {
        type Obj<Properties extends TSRecord<string, pito>> = PitoObj<Properties>
    }
}
// ============================================================================================================================================
export * from './tuple.js'
Object.defineProperty(plugin, 'Tuple', { value: PitoTuple, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Tuple: typeof PitoTuple
    }
    namespace pito {
        type Tuple<Items extends [...pito[]]> = PitoTuple<Items>
    }
}
// ============================================================================================================================================
export * from './record.js'
Object.defineProperty(plugin, 'Record', { value: PitoRecord, configurable: false, writable: false })

declare module './pito' {
    interface PitoPlugin {
        Record: typeof PitoRecord
    }
    namespace pito {
        type Record<Value extends pito> = PitoRecord<Value>
    }
}
// ============================================================================================================================================
export * from './union-lit.js'
Object.defineProperty(plugin, 'Ulit', { value: PitoUnionLit, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Ulit: typeof PitoUnionLit
    }
    namespace pito {
        type Ulit<Lits extends string | number> = PitoUnionLit<Lits>
    }
}
// ============================================================================================================================================
export * from './union-obj.js'
Object.defineProperty(plugin, 'Uobj', { value: PitoUnionObj, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Uobj: typeof PitoUnionObj
    }
    namespace pito {
        type Uobj<Key extends string, Unions extends pito> = PitoUnionObj<Key, Unions>
    }
}
// ============================================================================================================================================
export * from './union.js'
Object.defineProperty(plugin, 'Union', { value: PitoUnion, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Union: typeof PitoUnion
    }
    namespace pito {
        type Union<Elems extends pito> = PitoUnion<Elems>
    }
}
// ============================================================================================================================================
export * from './omit.js'
Object.defineProperty(plugin, 'Omit', { value: PitoOmit, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Omit: typeof PitoOmit
    }
    namespace pito {
        type Omit<O, Keys extends string> = PitoOmit<O, Keys>
    }
}
// ============================================================================================================================================
export * from './pick.js'
Object.defineProperty(plugin, 'Pick', { value: PitoPick, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Pick: typeof PitoPick
    }
    namespace pito {
        type Pick<O, Keys extends string> = PitoPick<O, Keys>
    }
}
// ============================================================================================================================================
export * from './extends.js'
Object.defineProperty(plugin, 'Extends', { value: PitoExtends, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Extends: typeof PitoExtends
    }
    namespace pito {
        type Extends<PitoOrigin, Extends extends TSRecord<string, pito>> = PitoOrigin extends PitoObj<infer Origin> ? PitoObj<Omit<Origin, keyof Extends & string> & Extends> : never
    }
}
// ============================================================================================================================================
export * from './std-date.js'
Object.defineProperty(plugin, 'Date', { value: PitoDate, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Date: typeof PitoDate
    }
    namespace pito {
        type Date = PitoDate
    }
}
// ============================================================================================================================================
export * from './std-datetime.js'
Object.defineProperty(plugin, 'Datetime', { value: PitoDatetime, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Datetime: typeof PitoDatetime
    }
    namespace pito {
        type Datetime = PitoDatetime
    }
}
// ============================================================================================================================================
export * from './std-email.js'
Object.defineProperty(plugin, 'Email', { value: PitoEmail, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Email: typeof PitoEmail
    }
    namespace pito {
        type Email = PitoEmail
    }
}
// ============================================================================================================================================
export * from './std-hostname.js'
Object.defineProperty(plugin, 'Hostname', { value: PitoHostname, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Hostname: typeof PitoHostname
    }
    namespace pito {
        type Hostname = PitoHostname
    }
}
// ============================================================================================================================================
export * from './std-url.js'
Object.defineProperty(plugin, 'Url', { value: PitoUrl, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        Url: typeof PitoUrl
    }
    namespace pito {
        type Url = PitoUrl
    }
}
// ============================================================================================================================================
export * from './std-uuid.js'
Object.defineProperty(plugin, 'UUID', { value: PitoUUID, configurable: false, writable: false })
declare module './pito' {
    interface PitoPlugin {
        UUID: typeof PitoUUID
    }
    namespace pito {
        type UUID = PitoUUID
    }
}