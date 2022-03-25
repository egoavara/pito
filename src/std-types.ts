import { pito } from "./pito.js"



// Std-Types : Date
export type DateOption = {}
export type DateSchema = { type: 'string', format: 'date' }
export const DateProto: Partial<pito<string, Date, DateSchema, DateOption>> = {
    $wrap(raw) { return raw.toISOString().substring(0, 10) },
    $unwrap(raw) { return new Date(raw) },
    $strict() { return { type: 'string', format: 'date' } },
}
export type PitoDate = pito<string, Date, DateSchema, DateOption>
export const PitoDate = (): PitoDate => {
    return Object.create(DateProto, { type: { value: 'string' }, format: { value: 'date' } })
}

// Std-Types : Datetime
export type DatetimeOption = {}
export type DatetimeSchema = { type: 'string', format: 'date-time' }
export const DatetimeProto: Partial<pito<string, Date, DatetimeSchema, DatetimeOption>> = {
    $wrap(raw) { return raw.toISOString() },
    $unwrap(raw) { return new Date(raw) },
    $strict() { return { type: 'string', format: 'date-time' } },
}
export type PitoDatetime = pito<string, Date, DatetimeSchema, DatetimeOption>
export const PitoDatetime = (): PitoDatetime => {
    return Object.create(DatetimeProto, { type: { value: 'string' }, format: { value: 'date-time' } })
}



// TODO : Std-Types : Time



// Std-Types : Url
export type UrlOption = {}
export type UrlSchema = { type: 'string', format: 'url' }
export const UrlProto: Partial<pito<string, URL, UrlSchema, UrlOption>> = {
    $wrap(raw) { return raw.toString() },
    $unwrap(raw) { return new URL(raw) },
    $strict() { return { type: 'string', format: 'url' } },
}
export type PitoUrl = pito<string, URL, UrlSchema, UrlOption>
export const PitoUrl = (): PitoUrl => {
    return Object.create(UrlProto, { type: { value: 'string' }, format: { value: 'url' } })
}