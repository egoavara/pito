import { pito } from "./pito.js";
export function PitoDefineBuilder(raw) {
    return {
        build(proto) {
            const innerProto = Object.assign({
                $symbol: proto.symbol,
                $wrap: proto.wrap,
                $unwrap: proto.unwrap,
                $strict: proto.strict,
            }, pito.strict(raw));
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
//# sourceMappingURL=define.js.map