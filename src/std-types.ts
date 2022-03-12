


// Std-Types : Date
export type TypioDate = {
    $symbol: 'TypioDate',
    $type: Date,
    $raw: string,
    $unwrap(raw: string): Date,
    $wrap(raw: Date): string,
    // 
    type: 'string',
    format: 'date'
}

// Std-Types : Datetime
export type TypioDatetime = {
    $symbol: 'TypioDatetime',
    $type: Date,
    $raw: string,
    $unwrap(raw: string): Date,
    $wrap(raw: Date): string,
    // 
    type: 'string',
    format: 'date-time'
}


// TODO : Std-Types : Time
// export type TypioTime = {
//     $symbol: 'TypioTime',
//     $type: Date,
//     $raw: string,
//     $unwrap(raw: string): Date,
//     $wrap(raw: Date): string,
//     // 
//     type: 'string',
//     format: 'time'
// }


// Std-Types : Url
export type TypioUrl = {
    $symbol: 'TypioUrl',
    $type: URL,
    $raw: string,
    $unwrap(raw: string): URL,
    $wrap(raw: URL): string,
    // 
    type: 'string',
    format: 'url'
}


// Std-Types : Datetime
export function TypioDate(): TypioDate {
    return {
        $symbol: 'TypioDate',
        type: 'string',
        format: 'date',

        $unwrap(raw: string): Date {
            return new Date(raw)
        },
        $wrap(raw: Date): string {
            const YYYY = raw.getFullYear().toString().padStart(4, '0')
            const MM = raw.getMonth().toString().padStart(2, '0')
            const DD = raw.getDate().toString().padStart(2, '0')
            return `${YYYY}-${MM}-${DD}`
        },
    } as any
}


// Std-Types : Datetime
export function TypioDatetime(): TypioDatetime {
    return {
        $symbol: 'TypioDatetime',

        $unwrap(raw: string): Date {
            return new Date(raw)
        },
        $wrap(raw: Date): string {
            const YYYY = raw.getFullYear().toString().padStart(4, '0')
            const MM = raw.getMonth().toString().padStart(2, '0')
            const DD = raw.getDate().toString().padStart(2, '0')
            const hh = raw.getHours().toString().padStart(2, '0')
            const mm = raw.getMinutes().toString().padStart(2, '0')
            const ss = raw.getSeconds().toString().padStart(2, '0')
            const tzhh = Math.trunc((-raw.getTimezoneOffset()) / 60).toString().padStart(2, '0')
            const tzmm = Math.trunc((-raw.getTimezoneOffset()) / 60).toString().padStart(2, '0')
            return `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}+${tzhh}:${tzmm}`
        },
        type: 'string',
        format: 'date-time',
    } as any
}
// TODO : Std-Types : Time
// export function TypioTime(): TypioTime {
//     return {
//         $symbol: 'TypioTime',

//         $unwrap(raw: string): Date {
//             return new Date(raw)
//         },
//         $wrap(raw: Date): string {
//             const hh = raw.getHours().toString().padStart(2, '0')
//             const mm = raw.getMinutes().toString().padStart(2, '0')
//             const ss = raw.getSeconds().toString().padStart(2, '0')
//             const tzhh = Math.trunc((-raw.getTimezoneOffset()) / 60).toString().padStart(2, '0')
//             const tzmm = Math.trunc((-raw.getTimezoneOffset()) / 60).toString().padStart(2, '0')
//             return `${hh}:${mm}:${ss}+${tzhh}:${tzmm}`
//         },
//         type: 'string',
//         format: 'time',
//     } as any
// }

// Std-Types : Url
export function TypioUrl(): TypioUrl {
    return {
        $symbol: 'TypioUrl',
        type: 'string',
        format: 'url',

        $unwrap(raw: string): URL {
            return new URL(raw)
        },
        $wrap(raw: URL): string {
            return raw.toString()
        },
    } as any
}

