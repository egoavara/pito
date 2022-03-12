"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypioUrl = exports.TypioDatetime = exports.TypioDate = void 0;
function TypioDate() {
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
exports.TypioDate = TypioDate;
function TypioDatetime() {
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
exports.TypioDatetime = TypioDatetime;
function TypioUrl() {
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
exports.TypioUrl = TypioUrl;
//# sourceMappingURL=std-types.js.map