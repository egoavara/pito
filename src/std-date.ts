import { pito, plugin } from "./pito.js"

// Std-Types : Date
export type DateOption = { $ignoreTimezone?: boolean }
export type DateSchema = { type: 'string', format: 'date' }
export type PitoDate = pito<string, Date, DateSchema, DateOption>
export const PitoDate = (options?: DateOption): PitoDate => {
    return {
        type: 'string',
        format: 'date',
        ...(options !== undefined ? options : {}),
        $wrap(data) {
            if (this.$ignoreTimezone === true) {
                return data.toISOString().substring(0, 10)
            }
            const tzOffset = new Date().getTimezoneOffset() * 60000
            return new Date(data.getTime() - tzOffset).toISOString().substring(0, 10)
        },
        $unwrap(raw) {
            return new Date(raw)
        },
        $strict() {
            return {
                type: 'string',
                format: 'date',
            }
        },
        $bypass() {
            return false
        },
    }
}
