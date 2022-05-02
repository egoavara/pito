import { pito } from "./pito.js"


export class PitoDefineBuilder<Schema extends Record<string, any>, OptionHandler extends (data: any) => { option: any, extra: any }>{
    schema: Schema
    optionHandler: OptionHandler
    private constructor(schema: Schema, optionHandler: OptionHandler) {
        this.schema = schema
        this.optionHandler = optionHandler
    }

    static create<Schema extends Record<string, any>, OptionHandler extends (data: any) => { option: any, extra: any }>(
        schema: Schema,
        fn: OptionHandler,
    ): PitoDefineBuilder<Schema, OptionHandler> {
        return new PitoDefineBuilder(schema, fn)
    }
    build<Raw, Type>(
        wrapper: (this: pito<unknown, unknown, Schema, ReturnType<OptionHandler>['option'], ReturnType<OptionHandler>['extra']>, data: Type) => Raw,
        unwrapper: (this: pito<unknown, unknown, Schema, ReturnType<OptionHandler>['option'], ReturnType<OptionHandler>['extra']>, raw: Raw) => Type,
    ): (...args: Parameters<OptionHandler>) => pito<Raw, Type, Schema, ReturnType<OptionHandler>['option'], ReturnType<OptionHandler>['extra']> {
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
