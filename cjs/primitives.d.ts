export declare type TypioLiteral<L extends string | number | boolean> = {
    $symbol: 'TypioLiteral';
    $type: L;
    $raw: L;
    $unwrap(raw: L): L;
    $wrap(raw: L): L;
    const: L;
};
export declare type TypioString = {
    $symbol: 'TypioString';
    $type: string;
    $raw: string;
    $unwrap(raw: string): string;
    $wrap(raw: string): string;
    type: 'string';
};
export declare type TypioNumberOption = {
    minimum?: number;
    exclusiveMinimum?: boolean;
    maximum?: number;
    exclusiveMaximum?: boolean;
    default?: number;
};
export declare type TypioNumber = {
    $symbol: 'TypioNumber';
    $type: number;
    $raw: number;
    $unwrap(raw: number): number;
    $wrap(raw: number): number;
    type: 'number';
};
export declare type TypioBoolean = {
    $symbol: 'TypioBoolean';
    $type: boolean;
    $raw: boolean;
    $unwrap(raw: boolean): boolean;
    $wrap(raw: boolean): boolean;
    type: 'boolean';
};
export declare function TypioLiteral<L extends string | number | boolean>(l: L): TypioLiteral<L>;
export declare function TypioString(): TypioString;
export declare function TypioNumber<Option extends TypioNumberOption = {}>(option?: Option): TypioNumber & Option;
export declare function TypioBoolean(): any;
//# sourceMappingURL=primitives.d.ts.map