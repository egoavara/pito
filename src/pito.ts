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


export class Pito<Base extends Record<string, any>, Plugin extends Record<string, any> = {}>{
    protected base: Base
    protected plugin: Plugin
    protected constructor(base: Base, plugin: Plugin) {
        this.base = base
        this.plugin = plugin
        Object.assign(this, base)
        Object.assign(this, plugin)
    }
    static create<NewBase extends Record<string, any>, NewPlugin extends Record<string, any> = {}>(newBase: NewBase, newPlugin?: NewPlugin)
        : Pito<Omit<NewBase, keyof Pito<NewBase, NewPlugin>>, NewPlugin> & Omit<NewBase, keyof Pito<NewBase, NewPlugin>> & Omit<NewPlugin, keyof Pito<NewBase, NewPlugin>> {
        return new Pito(newBase, newPlugin ?? {}) as any
    }
    wrap<T extends pito>(t: T, data: PitoType<T>): PitoRaw<T> {
        return t.$wrap(data)
    }
    unwrap<T extends pito>(t: T, data: PitoRaw<T>): PitoType<T> {
        return t.$unwrap(data)
    }
    strict<T extends pito>(t: T,): PitoSchema<T> & PitoOption<T> {
        return t.$strict()
    }
    register<NewPlugin extends Record<string, any>>(newPlugin: NewPlugin):
        & Pito<Base, Omit<Plugin, keyof NewPlugin> & Omit<NewPlugin, keyof this>>
        & Base
        & Omit<Plugin, keyof NewPlugin>
        & Omit<NewPlugin, keyof this> {
        return new Pito(this.base, Object.assign({}, this.plugin, newPlugin)) as any
    }
}
export const pito = Pito.create({
    Any: PitoAny,
    Nul: PitoNul,
    Lit: PitoLit,
    Bool: PitoBool,
    Num: PitoNum,
    Str: PitoStr,
    Int: PitoInt,
    Regex: PitoRegex,
    Opt: PitoOpt,
    Enums: PitoEnums,
    Arr: PitoArr,
    Obj: PitoObj,
    Tuple: PitoTuple,
    Record: PitoRecord,
    Ulit: PitoUnionLit,
    Uobj: PitoUnionObj,
    Union: PitoUnion,
    Omit: PitoOmit,
    Pick: PitoPick,
    Extends: PitoExtends,
}, {
    Date: PitoDate,
    Datetime: PitoDatetime,
    Email: PitoEmail,
    Hostname: PitoHostname,
    Url: PitoUrl,
    UUID: PitoUUID,
});
// 
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
};
// ============================================================================================================================================
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
export * from './extends.js'
export * from './std-date.js'
export * from './std-datetime.js'
export * from './std-email.js'
export * from './std-hostname.js'
export * from './std-url.js'
export * from './std-uuid.js'