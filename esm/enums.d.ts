import { pito } from "./pito.js";
declare type ParseEnums<Enums extends Record<string, string | number>> = {
    [K in keyof Enums]: Enums[K] extends string ? {
        type: 'string';
        const: Enums[K];
    } : Enums[K] extends number ? {
        type: 'number';
        const: Enums[K];
    } : never;
}[keyof Enums];
declare type ParseValues<Enums extends Record<string, string | number>> = Enums[keyof Enums];
export declare type EnumsOption = {};
export declare type EnumsSchema<Enums extends Record<string, string | number>> = {
    anyOf: (ParseEnums<Enums>)[];
};
export declare const EnumProto: Partial<pito<string | number, string | number, EnumsSchema<Record<string, string | number>>, EnumsOption>>;
export declare type PitoEnums<Enums extends Record<string, string | number>> = pito<string | number, ParseValues<Enums>, EnumsSchema<Enums>, EnumsOption>;
export declare const PitoEnums: <Enum extends Record<string, string | number>>(e: Enum, option?: EnumsOption | undefined) => PitoEnums<Enum>;
export {};
//# sourceMappingURL=enums.d.ts.map