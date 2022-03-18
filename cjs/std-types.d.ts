import { typio } from "./typio.js";
export declare type DateOption = {};
export declare type DateSchema = {
    type: 'string';
    format: 'date';
};
export declare const DateProto: typio<string, Date, DateSchema, DateOption>;
export declare type TypioDate = typio<string, Date, DateSchema, DateOption> & DateSchema & DateOption;
export declare const TypioDate: () => TypioDate;
export declare type DatetimeOption = {};
export declare type DatetimeSchema = {
    type: 'string';
    format: 'date-time';
};
export declare const DatetimeProto: typio<string, Date, DatetimeSchema, DatetimeOption>;
export declare type TypioDatetime = typio<string, Date, DatetimeSchema, DatetimeOption> & DatetimeSchema & DatetimeOption;
export declare const TypioDatetime: () => TypioDatetime;
export declare type TimeOption = {};
export declare type TimeSchema = {
    type: 'string';
    format: 'time';
};
export declare const TimeProto: typio<string, Date, TimeSchema, TimeOption>;
export declare type TypioTime = typio<string, Date, TimeSchema, TimeOption> & TimeSchema & TimeOption;
export declare const TypioTime: () => TypioTime;
export declare type UrlOption = {};
export declare type UrlSchema = {
    type: 'string';
    format: 'url';
};
export declare const UrlProto: typio<string, URL, UrlSchema, UrlOption>;
export declare type TypioUrl = typio<string, URL, UrlSchema, UrlOption> & UrlSchema & UrlOption;
export declare const TypioUrl: () => TypioUrl;
//# sourceMappingURL=std-types.d.ts.map