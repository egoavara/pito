import { PitoArr, PitoObj, PitoUnionObj } from './derived.js';
import { PitoOpt } from './modifier.js';
import { PitoBool, PitoInt, PitoLit, PitoNum, PitoRegex, PitoStr } from './primitives.js';
import { PitoDate, PitoDatetime, PitoUrl } from './std-types.js';
import { PitoDefineBuilder } from './define.js';
import { PitoEnums } from './enums.js';
export declare type pito<Raw = any, Type = any, Schema extends Record<string, any> = any, Option extends Record<string, any> = any, Extras extends Record<string, any> = {}> = {
    $unwrap(this: pito<Raw, Type, Schema, Option, Extras>, raw: Raw): Type;
    $wrap(this: pito<Raw, Type, Schema, Option, Extras>, raw: Type): Raw;
    $strict(this: pito<Raw, Type, Schema, Option, Extras>): Schema & Partial<Option>;
} & {
    [_ in keyof Schema]: Schema[_];
} & {
    [_ in keyof Option]?: Option[_];
} & {
    [_ in keyof Extras]: Extras[_];
};
export declare type PitoRaw<T> = T extends pito<infer Raw, any, any, any> ? Raw : never;
export declare type PitoType<T> = T extends pito<any, infer Type, any, any> ? Type : never;
export declare type PitoSchema<T> = T extends pito<any, any, infer Schema, any> ? Schema : never;
export declare type PitoOption<T> = T extends pito<any, any, any, infer Option> ? Option : never;
export declare namespace pito {
    type Raw<T extends pito> = PitoRaw<T>;
    type Type<T extends pito> = PitoType<T>;
    type Strict<T extends pito> = ReturnType<T['$strict']>;
    function wrap<T extends pito>(t: T, data: Type<T>): Raw<T>;
    function unwrap<T extends pito>(t: T, data: Raw<T>): Type<T>;
    function strict<T extends pito>(t: T): PitoSchema<T> & PitoOption<T>;
    type lit<L extends string | number | boolean> = PitoLit<L>;
    const lit: <T extends string | number | boolean>(l: T) => PitoLit<T>;
    type bool = PitoBool;
    const bool: () => PitoBool;
    type num = PitoNum;
    const num: (option?: import("./primitives.js").NumOption | undefined) => PitoNum;
    type str = PitoStr;
    const str: (option?: import("./primitives.js").StrOption | undefined) => PitoStr;
    type int = PitoInt;
    const int: (option?: import("./primitives.js").IntOption | undefined) => PitoInt;
    type regex<Pattern extends string = string> = PitoRegex<Pattern>;
    const regex: <Pattern extends string>(pattern: Pattern, option?: import("./primitives.js").StrOption | undefined) => PitoStr;
    type opt<T extends pito> = PitoOpt<T>;
    const opt: <T extends pito<any, any, any, any, {}>>(inner: T) => PitoOpt<T>;
    type enums<E extends Record<string, string | number>> = PitoEnums<E>;
    const enums: <Enum extends Record<string, string | number>>(e: Enum, option?: import("./enums.js").EnumsOption | undefined) => PitoEnums<Enum>;
    type uobj<Key extends string, Items extends Record<string, PitoObj<Record<string, pito>>>> = PitoUnionObj<Key, Items>;
    const uobj: <Key extends string, Items extends Record<string, PitoObj<Record<string, pito<any, any, any, any, {}>>>>>(key: Key, items: Items) => PitoUnionObj<Key, Items>;
    type obj<Properties extends Record<string, pito>> = PitoObj<Properties>;
    const obj: <Properties extends Record<string, pito<any, any, any, any, {}>>>(properties: Properties) => PitoObj<Properties>;
    type arr<Items extends pito> = PitoArr<Items>;
    const arr: <Items extends pito<any, any, any, any, {}>>(items: Items, option?: import("./derived.js").ArrOption | undefined) => PitoArr<Items>;
    type date = PitoDate;
    const date: () => PitoDate;
    type datetime = PitoDatetime;
    const datetime: () => PitoDatetime;
    type url = PitoUrl;
    const url: () => PitoUrl;
    function def<DefRaw extends pito>(schema: DefRaw): PitoDefineBuilder<pito.Type<DefRaw>, pito.Strict<DefRaw>>;
}
export * from './primitives.js';
export * from './derived.js';
export * from './modifier.js';
export * from './std-types.js';
//# sourceMappingURL=pito.d.ts.map