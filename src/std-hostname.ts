import { extendPlugin, pito } from "./pito.js"

// Std-Types : Date
export type HostnameOption = {}
export type HostnameSchema = { type: 'string', format: 'hostname' }
export type PitoHostname = pito<string, string, HostnameSchema, HostnameOption>
export const PitoHostname = (): PitoHostname => {
    return {
        type: 'string',
        format: 'hostname',
        $wrap(data) {
            return data
        },
        $unwrap(raw) {
            return raw
        },
        $strict() {
            return {
                type: 'string',
                format: 'hostname',
            }
        },
        $bypass() {
            return true
        },
    }
}

//
extendPlugin('Hostname', PitoHostname)
declare module './pito' {
    interface PitoPlugin {
        Hostname: typeof PitoHostname
    }
    namespace pito {
        type Hostname = PitoHostname
    }
}