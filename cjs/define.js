"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PitoDefineBuilder = void 0;
const pito_js_1 = require("./pito.js");
function PitoDefineBuilder(raw) {
    return {
        build(proto) {
            const innerProto = Object.assign({
                $symbol: proto.symbol,
                $wrap: proto.wrap,
                $unwrap: proto.unwrap,
                $strict: proto.strict,
            }, pito_js_1.pito.strict(raw));
            return (option) => {
                if (option === undefined) {
                    return Object.create(innerProto);
                }
                return Object.assign(Object.create(innerProto), {
                    $option: option,
                });
            };
        }
    };
}
exports.PitoDefineBuilder = PitoDefineBuilder;
//# sourceMappingURL=define.js.map