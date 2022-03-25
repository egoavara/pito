import { PitoArr, PitoObj, PitoUnionObj } from './derived.js';
import { PitoOpt } from './modifier.js';
import { PitoBool, PitoInt, PitoLit, PitoNum, PitoRegex, PitoStr } from './primitives.js';
import { PitoDate, PitoDatetime, PitoUrl } from './std-types.js';
import { PitoDefineBuilder } from './define.js';
import { PitoEnums } from './enums.js';
export var pito;
(function (pito) {
    function wrap(t, data) {
        return t.$wrap(data);
    }
    pito.wrap = wrap;
    function unwrap(t, data) {
        return t.$unwrap(data);
    }
    pito.unwrap = unwrap;
    function strict(t) {
        return t.$strict();
    }
    pito.strict = strict;
    pito.lit = PitoLit;
    pito.bool = PitoBool;
    pito.num = PitoNum;
    pito.str = PitoStr;
    pito.int = PitoInt;
    pito.regex = PitoRegex;
    pito.opt = PitoOpt;
    pito.enums = PitoEnums;
    pito.uobj = PitoUnionObj;
    pito.obj = PitoObj;
    pito.arr = PitoArr;
    pito.date = PitoDate;
    pito.datetime = PitoDatetime;
    pito.url = PitoUrl;
    function def(schema) {
        return PitoDefineBuilder(schema);
    }
    pito.def = def;
})(pito || (pito = {}));
export * from './primitives.js';
export * from './derived.js';
export * from './modifier.js';
export * from './std-types.js';
//# sourceMappingURL=pito.js.map