import { pito } from "./pito.js"

export type PitoDefineBuilder<DefRaw, DefSchema extends Record<string, any>> = {
    build<DefType, DefOption>(
        proto: {
            symbol: string,
            wrap(this: pito<DefRaw, DefType, DefSchema, { $option?: DefOption }>, raw: DefType): DefRaw,
            unwrap(this: pito<DefRaw, DefType, DefSchema, { $option?: DefOption }>, type: DefRaw): DefType,
            strict(this: pito<DefRaw, DefType, DefSchema, { $option?: DefOption }>): DefSchema & Record<string, any>
        }
    ): (option?: DefOption) => pito<DefRaw, DefType, DefSchema, DefOption>;
}

export function PitoDefineBuilder<DefRaw extends pito,>(
    raw: DefRaw,
): PitoDefineBuilder<pito.Type<DefRaw>, pito.Strict<DefRaw>> {
    return {
        build(proto) {
            const innerProto = Object.assign(
                {
                    $symbol: proto.symbol,
                    $wrap: proto.wrap,
                    $unwrap: proto.unwrap,
                    $strict: proto.strict,
                },
                pito.strict(raw),
            )

            return (option) => {
                if (option === undefined) {
                    return Object.create(innerProto)
                }
                return Object.assign(Object.create(innerProto), {
                    $option: option,
                })
            }

        }
    }
}