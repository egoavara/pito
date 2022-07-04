import { extendPlugin, pito } from "./pito.js"

// Std-Types : Date
export type DateOption = {}
export type DateSchema = { type: 'string', format: 'date' }
export type PitoDate = pito<string, Date, DateSchema, DateOption>
export const PitoDate = (): PitoDate => {
    return {
        type: 'string',
        format: 'date',
        $wrap(data) {
            return data.toISOString().substring(0, 10)
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

//
extendPlugin('Date', PitoDate)
declare module './pito' {
    interface PitoPlugin {
        Date: typeof PitoDate
    }
    namespace pito {
        type Date = PitoDate
    }
}