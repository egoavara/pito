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
exports.typio = exports.__name__ = void 0;
const derived_js_1 = require("./derived.js");
const modifier_js_1 = require("./modifier.js");
const primitives_js_1 = require("./primitives.js");
const std_primitives_js_1 = require("./std-primitives.js");
const std_types_js_1 = require("./std-types.js");
exports.__name__ = 'typio';
var typio;
(function (typio) {
    function wrap(t, data) {
        return t.$wrap(data);
    }
    typio.wrap = wrap;
    function unwrap(t, data) {
        return t.$unwrap(data);
    }
    typio.unwrap = unwrap;
    typio.lit = primitives_js_1.TypioLiteral;
    typio.str = primitives_js_1.TypioString;
    typio.num = primitives_js_1.TypioNumber;
    typio.bool = primitives_js_1.TypioBoolean;
    typio.obj = derived_js_1.TypioObject;
    typio.arr = derived_js_1.TypioArray;
    typio.opt = modifier_js_1.TypioOption;
    typio.int = std_primitives_js_1.TypioInteger;
    typio.regex = std_primitives_js_1.TypioRegex;
    typio.date = std_types_js_1.TypioDate;
    typio.datetime = std_types_js_1.TypioDatetime;
    typio.url = std_types_js_1.TypioUrl;
})(typio = exports.typio || (exports.typio = {}));
__exportStar(require("./primitives.js"), exports);
__exportStar(require("./derived.js"), exports);
__exportStar(require("./modifier.js"), exports);
__exportStar(require("./std-primitives.js"), exports);
__exportStar(require("./std-types.js"), exports);
//# sourceMappingURL=typio.js.map