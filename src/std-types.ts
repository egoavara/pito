import { typio } from "./typio.js"



// Std-Types : Date
export type DateOption = {}
export type DateSchema = { type: 'string', format: 'date' }
export const DateProto: typio<string, Date, DateSchema, DateOption> = {
    $symbol: 'TypioDate',
    $wrap(raw) { return raw.toISOString().substring(0, 10) },
    $unwrap(raw) { return new Date(raw) },
    $strict() { return { type: 'string', format: 'date' } },
}
export type TypioDate = typio<string, Date, DateSchema, DateOption> & DateSchema & DateOption
export const TypioDate = (): TypioDate => {
    return Object.create(DateProto, { type: { value: 'string' }, format: { value: 'date' } })
}


// Std-Types : Datetime
export type DatetimeOption = {}
export type DatetimeSchema = { type: 'string', format: 'date-time' }
export const DatetimeProto: typio<string, Date, DatetimeSchema, DatetimeOption> = {
    $symbol: 'TypioDatetime',
    $wrap(raw) { return raw.toISOString() },
    $unwrap(raw) { return new Date(raw) },
    $strict() { return { type: 'string', format: 'date-time' } },
}
export type TypioDatetime = typio<string, Date, DatetimeSchema, DatetimeOption> & DatetimeSchema & DatetimeOption
export const TypioDatetime = (): TypioDatetime => {
    return Object.create(DatetimeProto, { type: { value: 'string' }, format: { value: 'date-time' } })
}



// Std-Types : Time
export type TimeOption = {}
export type TimeSchema = { type: 'string', format: 'time' }
export const TimeProto: typio<string, Date, TimeSchema, TimeOption> = {
    $symbol: 'TypioTime',
    $wrap(raw) { return raw.toISOString().substring(11) },
    $unwrap(raw) { return new Date(raw) },
    $strict() { return { type: 'string', format: 'time' } },
}
export type TypioTime = typio<string, Date, TimeSchema, TimeOption> & TimeSchema & TimeOption
export const TypioTime = (): TypioTime => {
    return Object.create(TimeProto, { type: { value: 'string' }, format: { value: 'time' } })
}


// Std-Types : Url
export type UrlOption = {}
export type UrlSchema = { type: 'string', format: 'url' }
export const UrlProto: typio<string, URL, UrlSchema, UrlOption> = {
    $symbol: 'TypioUrl',
    $wrap(raw) { return raw.toString()},
    $unwrap(raw) { return new URL(raw) },
    $strict() { return { type: 'string', format: 'url' } },
}
export type TypioUrl = typio<string, URL, UrlSchema, UrlOption> & UrlSchema & UrlOption
export const TypioUrl = (): TypioUrl => {
    return Object.create(UrlProto, { type: { value: 'string' }, format: { value: 'url' } })
}