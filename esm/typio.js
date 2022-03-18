import { TypioBool, TypioInt, TypioLit, TypioNum, TypioRegex, TypioStr } from './primitives.js';
import { TypioDate, TypioDatetime, TypioUrl } from './std-types.js';
import { TypioOpt } from './modifier.js';
import { TypioArr, TypioObj } from './derived.js';
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
    function strict(t) {
        return t.$strict();
    }
    typio.strict = strict;
    typio.lit = TypioLit;
    typio.str = TypioStr;
    typio.regex = TypioRegex;
    typio.num = TypioNum;
    typio.int = TypioInt;
    typio.bool = TypioBool;
    typio.opt = TypioOpt;
    typio.obj = TypioObj;
    typio.arr = TypioArr;
    typio.date = TypioDate;
    typio.datetime = TypioDatetime;
    typio.url = TypioUrl;
})(typio || (typio = {}));
export * from './derived.js';
export * from './std-types.js';
export * from './modifier.js';
export * from './primitives.js';
//# sourceMappingURL=typio.js.map