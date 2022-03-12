export declare type TypioDate = {
    $symbol: 'TypioDate';
    $type: Date;
    $raw: string;
    $unwrap(raw: string): Date;
    $wrap(raw: Date): string;
    type: 'string';
    format: 'date';
};
export declare type TypioDatetime = {
    $symbol: 'TypioDatetime';
    $type: Date;
    $raw: string;
    $unwrap(raw: string): Date;
    $wrap(raw: Date): string;
    type: 'string';
    format: 'date-time';
};
export declare type TypioUrl = {
    $symbol: 'TypioUrl';
    $type: URL;
    $raw: string;
    $unwrap(raw: string): URL;
    $wrap(raw: URL): string;
    type: 'string';
    format: 'url';
};
export declare function TypioDate(): TypioDate;
export declare function TypioDatetime(): TypioDatetime;
export declare function TypioUrl(): TypioUrl;
//# sourceMappingURL=std-types.d.ts.map