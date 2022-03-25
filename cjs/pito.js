"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pito = void 0;
const derived_js_1 = require("./derived.js");
const modifier_js_1 = require("./modifier.js");
const primitives_js_1 = require("./primitives.js");
const std_types_js_1 = require("./std-types.js");
const define_js_1 = require("./define.js");
const enums_js_1 = require("./enums.js");
var pito;
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
    pito.lit = primitives_js_1.PitoLit;
    pito.bool = primitives_js_1.PitoBool;
    pito.num = primitives_js_1.PitoNum;
    pito.str = primitives_js_1.PitoStr;
    pito.int = primitives_js_1.PitoInt;
    pito.regex = primitives_js_1.PitoRegex;
    pito.opt = modifier_js_1.PitoOpt;
    pito.enums = enums_js_1.PitoEnums;
    pito.uobj = derived_js_1.PitoUnionObj;
    pito.obj = derived_js_1.PitoObj;
    pito.arr = derived_js_1.PitoArr;
    pito.date = std_types_js_1.PitoDate;
    pito.datetime = std_types_js_1.PitoDatetime;
    pito.url = std_types_js_1.PitoUrl;
    function def(schema) {
        return (0, define_js_1.PitoDefineBuilder)(schema);
    }
    pito.def = def;
})(pito = exports.pito || (exports.pito = {}));
__exportStar(require("./primitives.js"), exports);
__exportStar(require("./derived.js"), exports);
__exportStar(require("./modifier.js"), exports);
__exportStar(require("./std-types.js"), exports);
//# sourceMappingURL=pito.js.map