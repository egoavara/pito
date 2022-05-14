import { pito } from "./pito.js"


export class PitoDefineBuilder<Schema extends Record<string, any>, OptionHandler extends (data: any) => { option: any, extra: any }>{
    name : string
    schema: Schema
    optionHandler: OptionHandler
    assignableHandler: (data: any) => boolean
    constructor(name : string, schema: Schema, optionHandler: OptionHandler) {
        this.name = name
        this.schema = schema
        this.optionHandler = optionHandler
        this.assignableHandler = () => {
            throw new Error(`not allow union define ${this.name}`)
        }
    }

    static create<Schema extends Record<string, any>, OptionHandler extends (data: any) => { option: any, extra: any }>(
        name : string,
        schema: Schema,
        fn: OptionHandler,
    ): PitoDefineBuilder<Schema, OptionHandler> {
        return new PitoDefineBuilder(name, schema, fn)
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
                $bypass() {
                    return false
                },
            }
        }
    }
}
