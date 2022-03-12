export function TypioDate() {
    return {
        $symbol: 'TypioDate',
        type: 'string',
        format: 'date',
        $unwrap(raw) {
            return new Date(raw);
        },
        $wrap(raw) {
            const YYYY = raw.getFullYear().toString().padStart(4, '0');
            const MM = raw.getMonth().toString().padStart(2, '0');
            const DD = raw.getDate().toString().padStart(2, '0');
            return `${YYYY}-${MM}-${DD}`;
        },
    };
}
export function TypioDatetime() {
    return {
        $symbol: 'TypioDatetime',
        $unwrap(raw) {
            return new Date(raw);
        },
        $wrap(raw) {
            const YYYY = raw.getFullYear().toString().padStart(4, '0');
            const MM = raw.getMonth().toString().padStart(2, '0');
            const DD = raw.getDate().toString().padStart(2, '0');
            const hh = raw.getHours().toString().padStart(2, '0');
            const mm = raw.getMinutes().toString().padStart(2, '0');
            const ss = raw.getSeconds().toString().padStart(2, '0');
            const tzhh = Math.trunc((-raw.getTimezoneOffset()) / 60).toString().padStart(2, '0');
            const tzmm = Math.trunc((-raw.getTimezoneOffset()) / 60).toString().padStart(2, '0');
            return `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}+${tzhh}:${tzmm}`;
        },
        type: 'string',
        format: 'date-time',
    };
}
export function TypioUrl() {
    return {
        $symbol: 'TypioUrl',
        type: 'string',
        format: 'url',
        $unwrap(raw) {
            return new URL(raw);
        },
        $wrap(raw) {
            return raw.toString();
        },
    };
}
//# sourceMappingURL=std-types.js.map