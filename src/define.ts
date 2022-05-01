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

export class PitoDefineBuilder<Schema extends Record<string, any>, OptionHandler extends (data: any) => { option: any, extra: any}>{
    schema: Schema
    optionHandler: OptionHandler
    private constructor(schema: Schema, optionHandler: OptionHandler) {
        this.schema = schema
        this.optionHandler = optionHandler
    }

    static create<Schema extends Record<string, any>, OptionHandler extends (data: any) => { option: any, extra: any}>(
        schema: Schema,
        fn: OptionHandler,
    ): PitoDefineBuilder<Schema, OptionHandler> {
        return new PitoDefineBuilder(schema, fn)
    }
    build<Raw, Type>(
        wrapper: (this: pito<unknown, unknown, Schema, ReturnType<OptionHandler>['option'], ReturnType<OptionHandler>['extra']>, data: Type) => Raw,
        unwrapper: (this: pito<unknown, unknown, Schema, ReturnType<OptionHandler>['option'], ReturnType<OptionHandler>['extra']>, raw: Raw) => Type,
    ): (...args:Parameters<OptionHandler>) => pito<Raw, Type, Schema, ReturnType<OptionHandler>['option'], ReturnType<OptionHandler>['extra']> {
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
