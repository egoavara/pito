import { pito, plugin } from "./pito.js"

// Derived : Record
export type RecordOption = {}
export type RecordSchema<Value extends pito> = { type: 'object', additionalProperties: Value }
export type PitoRecord<Value extends pito> = pito<Record<string, pito.Raw<Value>>, Record<string, pito.Type<Value>>, RecordSchema<Value>, RecordOption>
export const PitoRecord = <Items extends pito>(items: Items, option?: RecordOption): PitoRecord<Items> => {
    return {
        type: 'object',
        additionalProperties: items,
        $wrap(raw) {
            return Object.fromEntries(
                Object
                    .entries(raw)
                    .map(([k, v]) => [k, pito.wrap(items, v)])
            )
        },
        $unwrap(raw) {
            return Object.fromEntries(
                Object
                    .entries(raw)
                    .map(([k, v]) => [k, pito.unwrap(items, v)])
            )
        },
        $strict() {
            return { type: 'object', additionalProperties: pito.strict(items) as any, ...(option ?? {}) }
        },
        $bypass() {
            return this.additionalProperties.$bypass()
        },
    }
}