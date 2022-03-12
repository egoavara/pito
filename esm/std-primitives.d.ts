export declare type TypioIntegerOption = {
    minimum?: number;
    exclusiveMinimum?: boolean;
    maximum?: number;
    exclusiveMaximum?: boolean;
    default?: number;
};
export declare type TypioRegex = {
    $symbol: 'TypioRegex';
    $type: string;
    $raw: string;
    $wrap(raw: string): string;
    $unwrap(raw: string): string;
    type: 'string';
    pattern: string;
};
export declare type TypioInteger = {
    $symbol: 'TypioInteger';
    $type: number;
    $raw: number;
    $wrap(raw: number): number;
    $unwrap(raw: number): number;
    type: 'integer';
};
export declare function TypioRegex(pattern: string): TypioRegex;
export declare function TypioInteger<Option extends TypioIntegerOption = {}>(option?: Option): TypioInteger & Option;
//# sourceMappingURL=std-primitives.d.ts.map