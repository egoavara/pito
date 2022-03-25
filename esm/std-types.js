export const DateProto = {
    $wrap(raw) { return raw.toISOString().substring(0, 10); },
    $unwrap(raw) { return new Date(raw); },
    $strict() { return { type: 'string', format: 'date' }; },
};
export const PitoDate = () => {
    return Object.create(DateProto, { type: { value: 'string' }, format: { value: 'date' } });
};
export const DatetimeProto = {
    $wrap(raw) { return raw.toISOString(); },
    $unwrap(raw) { return new Date(raw); },
    $strict() { return { type: 'string', format: 'date-time' }; },
};
export const PitoDatetime = () => {
    return Object.create(DatetimeProto, { type: { value: 'string' }, format: { value: 'date-time' } });
};
export const UrlProto = {
    $wrap(raw) { return raw.toString(); },
    $unwrap(raw) { return new URL(raw); },
    $strict() { return { type: 'string', format: 'url' }; },
};
export const PitoUrl = () => {
    return Object.create(UrlProto, { type: { value: 'string' }, format: { value: 'url' } });
};
//# sourceMappingURL=std-types.js.map