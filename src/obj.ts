import { OptModifier } from "./modifier-opt.js"
import { extendPlugin, pito } from "./pito.js"

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
export type ObjOption = {}
export type ObjSchema<Properties extends Record<string, pito>> = { type: 'object', properties: Properties, required: (Required<Properties>)[], additionalProperties: false }

export type PitoObj<Properties extends Record<string, pito>> =
    pito<
        RawFromProperties<Properties>,
        TypeFromProperties<Properties>,
        ObjSchema<Properties>,
        ObjOption
    >


export function PitoObj<Properties extends Record<string, pito>>(properties: Properties): PitoObj<Properties> {
    return {
        type: 'object',
        properties,
        required: Object.keys(properties).filter(v => (properties[v] as any)['$optional'] !== true) as any,
        additionalProperties: false,
        $wrap(data) {
            const result: any = {}
            for (const k in this.properties) {
                // @ts-expect-error
                const isRequired = this.required.includes(k)
                if (isRequired) {
                    if (!(k in data)) {
                        throw new Error(`pito.Obj required [${k}] not exist on ${data}`)
                    }
                    // @ts-expect-error
                    result[k] = this.properties[k].$wrap(data[k])
                } else {
                    // @ts-expect-error
                    if (k in data && data[k] != null) {
                        // @ts-expect-error
                        result[k] = this.properties[k].$wrap(data[k])
                    }
                }
            }
            return result
        },
        $unwrap(raw) {
            const result: any = {}
            for (const k in this.properties) {
                // @ts-expect-error
                const isRequired = this.required.includes(k)
                if (isRequired) {
                    if (!(k in raw)) {
                        throw new Error(`pito.Obj required [${k}] not exist on ${raw}`)
                    }
                    // @ts-expect-error
                    result[k] = this.properties[k].$unwrap(raw[k])
                } else {
                    // @ts-expect-error
                    if (k in raw && raw[k] != null) {
                        // @ts-expect-error
                        result[k] = this.properties[k].$unwrap(raw[k])
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
    }
}

//
extendPlugin('Obj', PitoObj)
declare module './pito' {
    interface PitoPlugin {
        Obj: typeof PitoObj
    }
    namespace pito {
        type Obj<Properties extends TSRecord<string, pito>> = PitoObj<Properties>
    }
}