"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypioUrl = exports.UrlProto = exports.TypioTime = exports.TimeProto = exports.TypioDatetime = exports.DatetimeProto = exports.TypioDate = exports.DateProto = void 0;
exports.DateProto = {
    $symbol: 'TypioDate',
    $wrap(raw) { return raw.toISOString().substring(0, 10); },
    $unwrap(raw) { return new Date(raw); },
    $strict() { return { type: 'string', format: 'date' }; },
};
const TypioDate = () => {
    return Object.create(exports.DateProto, { type: { value: 'string' }, format: { value: 'date' } });
};
exports.TypioDate = TypioDate;
exports.DatetimeProto = {
    $symbol: 'TypioDatetime',
    $wrap(raw) { return raw.toISOString(); },
    $unwrap(raw) { return new Date(raw); },
    $strict() { return { type: 'string', format: 'date-time' }; },
};
const TypioDatetime = () => {
    return Object.create(exports.DatetimeProto, { type: { value: 'string' }, format: { value: 'date-time' } });
};
exports.TypioDatetime = TypioDatetime;
exports.TimeProto = {
    $symbol: 'TypioTime',
    $wrap(raw) { return raw.toISOString().substring(11); },
    $unwrap(raw) { return new Date(raw); },
    $strict() { return { type: 'string', format: 'time' }; },
};
const TypioTime = () => {
    return Object.create(exports.TimeProto, { type: { value: 'string' }, format: { value: 'time' } });
};
exports.TypioTime = TypioTime;
exports.UrlProto = {
    $symbol: 'TypioUrl',
    $wrap(raw) { return raw.toString(); },
    $unwrap(raw) { return new URL(raw); },
    $strict() { return { type: 'string', format: 'url' }; },
};
const TypioUrl = () => {
    return Object.create(exports.UrlProto, { type: { value: 'string' }, format: { value: 'url' } });
};
exports.TypioUrl = TypioUrl;
//# sourceMappingURL=std-types.js.map