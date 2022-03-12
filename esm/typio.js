import { TypioArray, TypioObject } from './derived.js';
import { TypioOption } from './modifier.js';
import { TypioBoolean, TypioLiteral, TypioNumber, TypioString } from './primitives.js';
import { TypioInteger, TypioRegex } from './std-primitives.js';
import { TypioDate, TypioDatetime, TypioUrl } from './std-types.js';
export const __name__ = 'typio';
export var typio;
(function (typio) {
    function wrap(t, data) {
        return t.$wrap(data);
    }
    typio.wrap = wrap;
    function unwrap(t, data) {
        return t.$unwrap(data);
    }
    typio.unwrap = unwrap;
    typio.lit = TypioLiteral;
    typio.str = TypioString;
    typio.num = TypioNumber;
    typio.bool = TypioBoolean;
    typio.obj = TypioObject;
    typio.arr = TypioArray;
    typio.opt = TypioOption;
    typio.int = TypioInteger;
    typio.regex = TypioRegex;
    typio.date = TypioDate;
    typio.datetime = TypioDatetime;
    typio.url = TypioUrl;
})(typio || (typio = {}));
export * from './primitives.js';
export * from './derived.js';
export * from './modifier.js';
export * from './std-primitives.js';
export * from './std-types.js';
//# sourceMappingURL=typio.js.map