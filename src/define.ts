import { pito } from "./pito.js"

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
