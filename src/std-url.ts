import { extendPlugin, pito } from "./pito.js"

// Std-Types : Url
export type UrlOption = {}
export type UrlScheme = { type: 'string', format: 'url' }
export type PitoUrl = pito<string, URL, UrlScheme, UrlOption>
export const PitoUrl = (): PitoUrl => {
    return {
        type: 'string',
        format: 'url',

        $wrap(data) {
            return data.toString()
        },
        $unwrap(raw) {
            return new URL(raw)
        },
        $strict() {
            return {
                type: 'string',
                format: 'url',
            }
        },
        $bypass() {
            return false
        },
    }
}

//
extendPlugin('Url', PitoUrl)
declare module './pito' {
    interface PitoPlugin {
        Url: typeof PitoUrl
    }
    namespace pito {
        type Url = PitoUrl
    }
}