import { extendPlugin, pito } from "./pito.js"

// Std-Types : Date
export type DatetimeOption = {}
export type DatetimeSchema = { type: 'string', format: 'date-time' }
export type PitoDatetime = pito<string, Date, DatetimeSchema, DatetimeOption>
export const PitoDatetime = (): PitoDatetime => {
    return {
        type: 'string',
        format: 'date-time',
        $wrap(data) {
            return new Date(data.getTime()).toISOString()
        },
        $unwrap(raw) {
            return new Date(raw)
        },
        $strict() {
            return {
                type: 'string',
                format: 'date-time',
            }
        },
        $bypass() {
            return false
        },
    }
}
//
extendPlugin('Datetime', PitoDatetime)
declare module './pito' {
    interface PitoPlugin {
        Datetime: typeof PitoDatetime
    }
    namespace pito {
        type Datetime = PitoDatetime
    }
}