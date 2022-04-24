import { pito } from "./pito.js"

// export type PitoDefineBuilder<DefRaw, DefSchema extends Record<string, any>> = {
//     build<DefType, DefOption>(
//         proto: {
//             symbol: string,
//             wrap(this: pito<DefRaw, DefType, DefSchema, { $option?: DefOption }>, raw: DefType): DefRaw,
//             unwrap(this: pito<DefRaw, DefType, DefSchema, { $option?: DefOption }>, type: DefRaw): DefType,
//             strict(this: pito<DefRaw, DefType, DefSchema, { $option?: DefOption }>): DefSchema & Record<string, any>
//         }
//     ): (option?: DefOption) => pito<DefRaw, DefType, DefSchema, DefOption>;
// }

// export function PitoDefineBuilder<DefRaw extends pito,>(
//     raw: DefRaw,
// ): PitoDefineBuilder<pito.Type<DefRaw>, pito.Strict<DefRaw>> {
//     return {
//         build(proto) {
//             const innerProto = Object.assign(
//                 {
//                     $symbol: proto.symbol,
//                     $wrap: proto.wrap,
//                     $unwrap: proto.unwrap,
//                     $strict: proto.strict,
//                 },
//                 pito.strict(raw),
//             )

//             return (option) => {
//                 if (option === undefined) {
//                     return Object.create(innerProto)
//                 }
//                 return Object.assign(Object.create(innerProto), {
//                     $option: option,
//                 })
//             }

//         }
//     }
// }

export class PitoDefineBuilder<Raw = any, Type = any, Schema extends Record<string, any> = any, Option extends Record<string, any> = any, Extras extends Record<string, any> = {}>{
    schema: Schema
    wrapper: (raw: Type) => Raw
    unwrapper: (data: Raw) => Type
    private constructor(schema: Schema, wrapper: (raw: Type) => Raw, unwrapper: (data: Raw) => Type,) {
        this.schema = schema
        this.wrapper = wrapper
        this.unwrapper = unwrapper
    }

    static create<Raw, Type, Schema extends Record<string, any>>(
        schema: Schema,
        wrapper: (data: Type) => Raw,
        unwrapper: (raw: Raw) => Type,
    ): PitoDefineBuilder<Raw, Type, Schema, {}, {}> {
        return new PitoDefineBuilder(schema, wrapper, unwrapper)
    }
    withOption<Option extends Record<string, any>>(): PitoDefineBuilder<Raw, Type, Schema, Option, Extras>;
    withOption<PitoOption extends pito.obj<Record<string, pito>>>(option: PitoOption): PitoDefineBuilder<Raw, Type, Schema, pito.Type<PitoOption>, Extras>
    withOption(option?: any): any { return this }
    build(): (option?: Option) => pito<Raw, Type, Schema, Option, Extras> {
        const { wrapper, unwrapper, schema } = this
        // @ts-expect-error
        return (option) => {
            return {
                ...schema,
                ...option,
                $wrap: wrapper,
                $unwrap: unwrapper,
                $strict() {
                    return {
                        ...schema,
                        ...option,
                    }
                },
            }
        }
    }
}
