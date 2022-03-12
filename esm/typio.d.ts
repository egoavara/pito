import { TypioArray, TypioObject } from './derived.js';
import { TypioOption } from './modifier.js';
import { TypioBoolean, TypioLiteral, TypioNumber, TypioString } from './primitives.js';
import { TypioInteger, TypioRegex } from './std-primitives.js';
import { TypioDate, TypioDatetime, TypioUrl } from './std-types.js';
export declare const __name__ = "typio";
export declare type typio<Raw = any, Type = any> = {
    $symbol: string;
    $type: Type;
    $raw: Raw;
    $unwrap(raw: Raw): Type;
    $wrap(raw: Type): Raw;
};
export declare type TypioRaw<T extends typio> = T['$raw'];
export declare type TypioType<T extends typio> = T['$type'];
export declare namespace typio {
    type Raw<T extends typio> = T['$raw'];
    type Type<T extends typio> = T['$type'];
    function wrap<T extends typio>(t: T, data: T['$type']): T['$raw'];
    function unwrap<T extends typio>(t: T, data: T['$raw']): T['$type'];
    const lit: typeof TypioLiteral;
    const str: typeof TypioString;
    const num: typeof TypioNumber;
    const bool: typeof TypioBoolean;
    const obj: typeof TypioObject;
    const arr: typeof TypioArray;
    const opt: typeof TypioOption;
    const int: typeof TypioInteger;
    const regex: typeof TypioRegex;
    const date: typeof TypioDate;
    const datetime: typeof TypioDatetime;
    const url: typeof TypioUrl;
}
export * from './primitives.js';
export * from './derived.js';
export * from './modifier.js';
export * from './std-primitives.js';
export * from './std-types.js';
//# sourceMappingURL=typio.d.ts.map