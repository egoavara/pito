import { PitoDefineBuilder } from "./define.js"
import { Duration, Time } from "./pito.js"

// Std-Types : Date
export type DateOption = {}
export const PitoDate = PitoDefineBuilder
    .create(
        { type: 'string', format: 'date' } as const,
        (raw: Date) => { return raw.toISOString().substring(0, 10) },
        (raw: string) => { return new Date(raw) },
    )
    .withOption<DateOption>()
    .build()
export type PitoDate = ReturnType<typeof PitoDate>

// Std-Types : Datetime
export type DatetimeOption = {}
export const PitoDatetime = PitoDefineBuilder
    .create(
        { type: 'string', format: 'date-time' } as const,
        (raw: Date) => { return raw.toISOString() },
        (raw: string) => { return new Date(raw) },
    )
    .withOption<DatetimeOption>()
    .build()
export type PitoDatetime = ReturnType<typeof PitoDatetime>

// Std-Types : Duration
export type DurationOption = {}

export const PitoDuration = PitoDefineBuilder
    .create(
        { type: 'string', format: 'duration' } as const,
        (raw: Duration) => {
            return raw.toString()
        },
        (raw: string): Duration => {
            return Duration(raw)
        },
    )
    .withOption<DatetimeOption>()
    .build()
export type PitoDuration = ReturnType<typeof PitoDuration>

// Std-Types : Duration
export type TimeOption = {}

export const PitoTime = PitoDefineBuilder
    .create(
        { type: 'string', format: 'time' } as const,
        (raw: Time) => {
            return raw.toString()
        },
        (raw: string): Time => {
            return Time(raw)
        },
    )
    .withOption<TimeOption>()
    .build()
export type PitoTime = ReturnType<typeof PitoTime>



// Std-Types : Url
export type UrlOption = {}
export const PitoUrl = PitoDefineBuilder
    .create(
        { type: 'string', format: 'url' } as const,
        (raw: URL) => { return raw.toString() },
        (raw: string) => { return new URL(raw) },
    )
    .withOption<UrlOption>()
    .build()
export type PitoUrl = ReturnType<typeof PitoUrl>
