import { OptModifier } from "./modifier.js"
import { typio } from "./typio.js"

// Utils
type Required<Properties extends Record<string, typio>> = { [k in keyof Properties]: Properties[k] extends OptModifier ? never : k }[keyof Properties]
type Optionals<Properties extends Record<string, typio>> = { [k in keyof Properties]: Properties[k] extends OptModifier ? k : never }[keyof Properties]
type TypeFromProperties<Properties extends Record<string, typio>> =
    & { [K in Required<Properties>]: typio.Type<Properties[K]> }
    & { [K in Optionals<Properties>]?: typio.Type<Properties[K]> }
type RawFromProperties<Properties extends Record<string, typio>> =
    & { [K in Required<Properties>]: typio.Raw<Properties[K]> }
    & { [K in Optionals<Properties>]?: typio.Raw<Properties[K]> }

// Derived : Obj
export type ObjOption = {}
export type ObjSchema<Properties extends Record<string, typio>> = { type: 'object', properties: Properties, required: (Required<Properties>)[], additionalProperties: false }
export const ObjProto: Partial<typio<Record<string, any>, Record<string, any>, ObjSchema<Record<string, typio>>, ObjOption>> = {
    $symbol: 'TypioObj',
    $wrap(raw) {
        for (const k in raw) {
            raw[k] = this.properties[k].$wrap(raw[k])
        }
        return raw
    },
    $unwrap(raw) {
        for (const k in raw) {
            raw[k] = this.properties[k].$unwrap(raw[k])
        }
        return raw
    },
    $strict() {
        return {
            type: 'object',
            properties: Object.fromEntries(
                Object.entries(this.properties).map(([k, v]) => {
                    return [
                        k, v.$strict()
                    ]
                })
            ),
            required: new Array(...this.required),
            additionalProperties: false,
        }
    },
}
export type TypioObj<Properties extends Record<string, typio>> = typio<RawFromProperties<Properties>, TypeFromProperties<Properties>, ObjSchema<Properties>, ObjOption>
export const TypioObj = <Properties extends Record<string, typio>>(properties: Properties): TypioObj<Properties> => {
    return Object.create(ObjProto, {
        type: { value: 'object' },
        properties: { value: properties },
        required: { value: Object.keys(properties).filter(v => (properties[v] as any)['$optional'] !== true) },
        additionalProperties: { value: false },
    })
}

// Derived : Arr

export type ArrOption = {}
export type ArrSchema = { type: 'array', items: typio }
export const ArrProto: Partial<typio<any[], any[], ArrSchema, ArrOption>> = {
    $symbol: 'TypioArr',
    $wrap(raw) { return raw.map(v => this.items.$wrap(v)) },
    $unwrap(raw) { return raw.map(v => this.items.$unwrap(v)) },
    $strict() { return { type: 'array', items: this.items.$strict() } },
}
export type TypioArr<Items extends typio> = typio<typio.Raw<Items>, typio.Type<Items>, ArrSchema, ArrOption>
export const TypioArr = <Items extends typio>(items: Items): TypioArr<Items> => {
    return Object.create(ArrProto, { type: { value: 'array' }, items: { value: items } })
}