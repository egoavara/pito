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

export class PitoDefineBuilder<Schema extends Record<string, any> = any, UserOption extends Record<string, any> = {}, SchemaOption extends Record<string, any> = {}, Extras extends Record<string, any> = {}>{
    schema: Schema
    optionHandler: (option?: UserOption) => { option: SchemaOption, extra: Extras, }
    private constructor(schema: Schema, optionHandler: (option?: UserOption) => { option: SchemaOption, extra: Extras, }) {
        this.schema = schema
        this.optionHandler = optionHandler
    }

    static create<Schema extends Record<string, any>, UserOption extends Record<string, any>, SchemaOption extends Record<string, any>, Extras extends Record<string, any> = {}>(
        schema: Schema,
        fn: (data?: UserOption) => { option: SchemaOption, extra: Extras, },
    ): PitoDefineBuilder<Schema, UserOption, SchemaOption, Extras> {
        return new PitoDefineBuilder(schema, fn)
    }
    build<Raw, Type>(
        wrapper: (this: pito<unknown, unknown, Schema, SchemaOption, Extras>, data: Type) => Raw,
        unwrapper: (this: pito<unknown, unknown, Schema, SchemaOption, Extras>, raw: Raw) => Type,
    ): (option?: UserOption) => pito<Raw, Type, Schema, SchemaOption, Extras> {
        const { schema, optionHandler } = this
        return (UserOption) => {
            const { extra, option } = optionHandler(UserOption)
            return {
                ...schema,
                ...option,
                ...extra,
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
