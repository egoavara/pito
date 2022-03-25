import { pito } from "./pito.js";
export declare type DateOption = {};
export declare type DateSchema = {
    type: 'string';
    format: 'date';
};
export declare const DateProto: Partial<pito<string, Date, DateSchema, DateOption>>;
export declare type PitoDate = pito<string, Date, DateSchema, DateOption>;
export declare const PitoDate: () => PitoDate;
export declare type DatetimeOption = {};
export declare type DatetimeSchema = {
    type: 'string';
    format: 'date-time';
};
export declare const DatetimeProto: Partial<pito<string, Date, DatetimeSchema, DatetimeOption>>;
export declare type PitoDatetime = pito<string, Date, DatetimeSchema, DatetimeOption>;
export declare const PitoDatetime: () => PitoDatetime;
export declare type UrlOption = {};
export declare type UrlSchema = {
    type: 'string';
    format: 'url';
};
export declare const UrlProto: Partial<pito<string, URL, UrlSchema, UrlOption>>;
export declare type PitoUrl = pito<string, URL, UrlSchema, UrlOption>;
export declare const PitoUrl: () => PitoUrl;
//# sourceMappingURL=std-types.d.ts.map