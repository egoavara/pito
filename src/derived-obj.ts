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
            for (const k in data) {
                // @ts-ignore
                if (this.required.indexOf(k) !== -1) {
                    // @ts-ignore
                    data[k] = this.properties[k].$wrap(data[k])
                } else {
                    // @ts-ignore
                    if (this.properties[k] !== undefined) {
                        // @ts-ignore
                        data[k] = this.properties[k].$wrap(data[k])
                    }

                }
            }
            return data as any
        },
        $unwrap(raw) {
            for (const k in raw) {
                // @ts-ignore
                raw[k] = this.properties[k].$unwrap(raw[k])
            }
            return raw as any
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
