import { PitoDefineBuilder } from "./define.js"
import { Duration, Time } from "./pito.js"

// Std-Types : Date
export type DateOption = {}
export const PitoDate = PitoDefineBuilder
    .create(
        { type: 'string', format: 'date' },
        (opt?: DateOption) => ({
            option: {},
            extra: {}
        }),
    )
    .build(
        (raw: Date) => { return raw.toISOString().substring(0, 10) },
        (raw: string) => { return new Date(raw) }
    )
export type PitoDate = ReturnType<typeof PitoDate>

// Std-Types : Datetime
export type DatetimeOption = {}
export const PitoDatetime = PitoDefineBuilder
    .create(
        { type: 'string', format: 'date-time' } as const,
        (opt?: DatetimeOption) => ({
            option: {},
            extra: {}
        }),
    )
    .build(
        (raw: Date) => { return raw.toISOString() },
        (raw: string) => { return new Date(raw) },
    )
export type PitoDatetime = ReturnType<typeof PitoDatetime>

// Std-Types : Duration
export type DurationOption = {}

export const PitoDuration = PitoDefineBuilder
    .create(
        { type: 'string', format: 'duration' } as const,
        (opt?: DurationOption) => ({
            option: {},
            extra: {}
        }),
    )
    .build(
        (raw: Duration) => {
            return raw.toString()
        },
        (raw: string): Duration => {
            return Duration(raw)
        },
    )
export type PitoDuration = ReturnType<typeof PitoDuration>

// Std-Types : Duration
export type TimeOption = {}

export const PitoTime = PitoDefineBuilder
    .create(
        { type: 'string', format: 'time' } as const,
        (opt?: TimeOption) => ({
            option: {},
            extra: {}
        }),
    )
    .build(
        (raw: Time) => {
            return raw.toString()
        },
        (raw: string): Time => {
            return Time(raw)
        },
    )
export type PitoTime = ReturnType<typeof PitoTime>



// Std-Types : Url
export type UrlOption = {}
export const PitoUrl = PitoDefineBuilder
    .create(
        { type: 'string', format: 'url' } as const,
        (opt?: UrlOption) => ({
            option: {},
            extra: {}
        }),
    )
    .build(
        (raw: URL) => { return raw.toString() },
        (raw: string) => { return new URL(raw) },
    )
export type PitoUrl = ReturnType<typeof PitoUrl>


// Std-Types : UUID
export type UUIDOption = {}
export const PitoUUID = PitoDefineBuilder
    .create(
        { type: 'string', format: 'uuid' } as const,
        (opt?: UUIDOption) => ({
            option: {},
            extra: {}
        }),
    )
    .build(
        (raw: string) => { return raw },
        (raw: string) => { return raw },
    )
export type PitoUUID = ReturnType<typeof PitoUUID>

// Std-Types : Email
export type EmailOption = {}
export const PitoEmail = PitoDefineBuilder
    .create(
        { type: 'string', format: 'email' } as const,
        (opt?: EmailOption) => ({
            option: {},
            extra: {}
        }),
    )
    .build(
        (raw: string) => { return raw },
        (raw: string) => { return raw },
    )
export type PitoEmail = ReturnType<typeof PitoEmail>


// Std-Types : hostname
export type HostnameOption = {}
export const PitoHostname = PitoDefineBuilder
    .create(
        { type: 'string', format: 'hostname' } as const,
        (opt?: EmailOption) => ({
            option: {},
            extra: {}
        }),
    )
    .build(
        (raw: string) => { return raw },
        (raw: string) => { return raw },
    )
export type PitoHostname = ReturnType<typeof PitoHostname>
