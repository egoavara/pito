export const DateProto = {
    $symbol: 'TypioDate',
    $wrap(raw) { return raw.toISOString().substring(0, 10); },
    $unwrap(raw) { return new Date(raw); },
    $strict() { return { type: 'string', format: 'date' }; },
};
export const TypioDate = () => {
    return Object.create(DateProto, { type: { value: 'string' }, format: { value: 'date' } });
};
export const DatetimeProto = {
    $symbol: 'TypioDatetime',
    $wrap(raw) { return raw.toISOString(); },
    $unwrap(raw) { return new Date(raw); },
    $strict() { return { type: 'string', format: 'date-time' }; },
};
export const TypioDatetime = () => {
    return Object.create(DatetimeProto, { type: { value: 'string' }, format: { value: 'date-time' } });
};
export const TimeProto = {
    $symbol: 'TypioTime',
    $wrap(raw) { return raw.toISOString().substring(11); },
    $unwrap(raw) { return new Date(raw); },
    $strict() { return { type: 'string', format: 'time' }; },
};
export const TypioTime = () => {
    return Object.create(TimeProto, { type: { value: 'string' }, format: { value: 'time' } });
};
export const UrlProto = {
    $symbol: 'TypioUrl',
    $wrap(raw) { return raw.toString(); },
    $unwrap(raw) { return new URL(raw); },
    $strict() { return { type: 'string', format: 'url' }; },
};
export const TypioUrl = () => {
    return Object.create(UrlProto, { type: { value: 'string' }, format: { value: 'url' } });
};
//# sourceMappingURL=std-types.js.map