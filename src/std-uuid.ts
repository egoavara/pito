import { pito, plugin } from "./pito.js"

// Std-Types : Date
export type UUIDOption = {}
export type UUIDSchema = { type: 'string', format: 'uuid' }
export type PitoUUID = pito<string, string, UUIDSchema, UUIDOption>
export const PitoUUID = (): PitoUUID => {
    return {
        type: 'string',
        format: 'uuid',
        $wrap(data) {
            return data
        },
        $unwrap(raw) {
            return raw
        },
        $strict() {
            return {
                type: 'string',
                format: 'uuid',
            }
        },
        $bypass() {
            return true
        },
    }
}