import { pito, plugin } from "./pito.js"

// Std-Types : Url
export type UrlOption = {}
export type UrlScheme = { type: 'string', format: 'url' }
export type PitoUrl = pito<string, URL, UrlScheme, UrlOption>
export const PitoUrl = (): PitoUrl => {
    return {
        type: 'string',
        format: 'url',
        $typeof : 'class',
        $constructor : URL,
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