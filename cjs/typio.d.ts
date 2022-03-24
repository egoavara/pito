import { TypioBool, TypioInt, TypioLit, TypioNum, TypioStr } from './primitives.js';
import { TypioDate, TypioDatetime, TypioUrl } from './std-types.js';
import { TypioOpt } from './modifier.js';
import { TypioArr, TypioObj } from './derived.js';
export declare type typio<Raw = any, Type = any, Schema extends Record<string, any> = any, Option extends Record<string, any> = any> = {
    $symbol: string;
    $unwrap(this: typio<Raw, Type, Schema, Option>, raw: Raw): Type;
    $wrap(this: typio<Raw, Type, Schema, Option>, raw: Type): Raw;
    $strict(this: typio<Raw, Type, Schema, Option>): Schema & Option;
} & {
    [_ in keyof Schema]: Schema[_];
} & {
    [_ in keyof Option]: Option[_];
};
export declare type TypioRaw<T> = T extends typio<infer Raw, any, any, any> ? Raw : never;
export declare type TypioType<T> = T extends typio<any, infer Type, any, any> ? Type : never;
export declare type TypioSchema<T> = T extends typio<any, any, infer Schema, any> ? Schema : never;
export declare type TypioOption<T> = T extends typio<any, any, any, infer Option> ? Option : never;
export declare namespace typio {
    type Raw<T extends typio> = TypioRaw<T>;
    type Type<T extends typio> = TypioType<T>;
    function wrap<T extends typio>(t: T, data: Type<T>): Raw<T>;
    function unwrap<T extends typio>(t: T, data: Raw<T>): Type<T>;
    function strict<T extends typio>(t: T): TypioSchema<T> & TypioOption<T>;
    const lit: <T extends string | number | boolean>(l: T) => TypioLit<T>;
    const bool: () => TypioBool;
    const num: (option?: import("./primitives.js").NumOption | undefined) => TypioNum;
    const str: (option?: import("./primitives.js").StrOption | undefined) => TypioStr;
    const int: (option?: import("./primitives.js").IntOption | undefined) => TypioInt;
    const regex: (pattern: string, option?: import("./primitives.js").StrOption | undefined) => TypioStr;
    const opt: <T extends typio<any, any, any, any>>(inner: T) => TypioOpt<T>;
    const obj: <Properties extends Record<string, typio<any, any, any, any>>>(properties: Properties) => TypioObj<Properties>;
    const arr: <Items extends typio<any, any, any, any>>(items: Items) => TypioArr<Items>;
    const date: () => TypioDate;
    const datetime: () => TypioDatetime;
    const url: () => TypioUrl;
}
export * from './derived.js';
export * from './std-types.js';
export * from './modifier.js';
export * from './primitives.js';
//# sourceMappingURL=typio.d.ts.map