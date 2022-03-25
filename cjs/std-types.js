"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PitoUrl = exports.UrlProto = exports.PitoDatetime = exports.DatetimeProto = exports.PitoDate = exports.DateProto = void 0;
exports.DateProto = {
    $wrap(raw) { return raw.toISOString().substring(0, 10); },
    $unwrap(raw) { return new Date(raw); },
    $strict() { return { type: 'string', format: 'date' }; },
};
const PitoDate = () => {
    return Object.create(exports.DateProto, { type: { value: 'string' }, format: { value: 'date' } });
};
exports.PitoDate = PitoDate;
exports.DatetimeProto = {
    $wrap(raw) { return raw.toISOString(); },
    $unwrap(raw) { return new Date(raw); },
    $strict() { return { type: 'string', format: 'date-time' }; },
};
const PitoDatetime = () => {
    return Object.create(exports.DatetimeProto, { type: { value: 'string' }, format: { value: 'date-time' } });
};
exports.PitoDatetime = PitoDatetime;
exports.UrlProto = {
    $wrap(raw) { return raw.toString(); },
    $unwrap(raw) { return new URL(raw); },
    $strict() { return { type: 'string', format: 'url' }; },
};
const PitoUrl = () => {
    return Object.create(exports.UrlProto, { type: { value: 'string' }, format: { value: 'url' } });
};
exports.PitoUrl = PitoUrl;
//# sourceMappingURL=std-types.js.map