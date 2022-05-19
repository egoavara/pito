import { OptModifier } from "./modifier.js"
import { pito } from "./pito.js"

// Utils
export type Required<Properties extends Record<string, pito>> = { [k in keyof Properties]: Properties[k] extends OptModifier ? never : k }[keyof Properties]
export type Optionals<Properties extends Record<string, pito>> = { [k in keyof Properties]: Properties[k] extends OptModifier ? k : never }[keyof Properties]
export type TypeFromProperties<Properties extends Record<string, pito>> =
    & { [K in Required<Properties>]: pito.Type<Properties[K]> }
    & { [K in Optionals<Properties>]?: pito.Type<Properties[K]> }
export type RawFromProperties<Properties extends Record<string, pito>> =
    & { [K in Required<Properties>]: pito.Raw<Properties[K]> }
    & { [K in Optionals<Properties>]?: pito.Raw<Properties[K]> }

// Derived : Obj
export type ObjOption = {
    additionalProperties?: false,
}
export type ObjSchema<Properties extends Record<string, pito>> = { type: 'object', properties: Properties, required: (Required<Properties>)[] }

export type PitoObj<Properties extends Record<string, pito>, AdditionalProperties extends boolean> =
    pito<
        RawFromProperties<Properties> & (AdditionalProperties extends true ? Record<string, any> : {}),
        TypeFromProperties<Properties> & (AdditionalProperties extends true ? Record<string, any> : {}),
        ObjSchema<Properties>,
        ObjOption
    >


export function PitoObj<Properties extends Record<string, pito>, AdditionalProperties extends boolean = false>(properties: Properties, option?: { additionalProperties?: AdditionalProperties }): PitoObj<Properties, AdditionalProperties> {
    return {
        type: 'object',
        properties,
        required: Object.keys(properties).filter(v => (properties[v] as any)['$optional'] !== true) as any,
        ...(option?.additionalProperties === true ? {} : { additionalProperties: false }),
        $wrap(data) {
            const result:any = {}
            for (const k in this.properties) {
                // @ts-expect-error
                const isRequired = this.required.includes(k)
                // @ts-expect-error
                if (k in data && data[k] != null) {
                    // @ts-expect-error
                    result[k] = this.properties[k].$wrap(data[k])
                } else {
                    if (isRequired) {
                        throw new Error(`not exist required property ${k}`)
                    }
                }
            }
            return result
        },
        $unwrap(raw) {
            const result:any = {}
            for (const k in this.properties) {
                // @ts-expect-error
                const isRequired = this.required.includes(k)
                if (k in raw) {
                    // @ts-expect-error
                    result[k] = this.properties[k].$wrap(raw[k])
                } else {
                    if (isRequired) {
                        throw new Error(`not exist required property ${k}`)
                    }
                }
            }
            return result
        },
        $strict() {
            return {
                type: 'object',
                properties: Object.fromEntries(
                    Object.entries(this.properties).map(([k, v]) => {
                        return [
                            k, (v as any).$strict()
                        ]
                    })
                ),
                required: new Array(...this.required),
                ...(this.additionalProperties === false ? { additionalProperties: false } : {}),
            } as any
        },
        $bypass() {
            return Object.values(properties).findIndex((v) => { !(v as any).$bypass() }) !== - 1
        },
        $isAssignableRaw(data) {
            return typeof data === 'object'
        },
    }
}
