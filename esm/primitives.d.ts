import { pito } from "./pito.js";
export declare type LitOption = {};
export declare type LitSchema<T extends string | number | boolean> = {
    const: T;
};
export declare const LitProto: Partial<pito<string | number | boolean, string | number | boolean, LitSchema<string | number | boolean>, LitOption>>;
export declare type PitoLit<T extends string | number | boolean> = pito<T, T, LitSchema<T>, LitOption>;
export declare const PitoLit: <T extends string | number | boolean>(l: T) => PitoLit<T>;
export declare type StrOption = {
    minLength?: number;
    maxLength?: number;
};
export declare type StrSchema = {
    type: 'string';
};
export declare const StrProto: Partial<pito<string, string, StrSchema, StrOption>>;
export declare type PitoStr = pito<string, string, StrSchema, StrOption>;
export declare const PitoStr: (option?: StrOption | undefined) => PitoStr;
export declare type RegexOption = {
    minLength?: number;
    maxLength?: number;
};
export declare type RegexSchema<P extends string> = {
    type: 'string';
    pattern: P;
};
export declare const RegexProto: Partial<pito<string, string, RegexSchema<string>, RegexOption>>;
export declare type PitoRegex<Pattern extends string = string> = pito<string, string, RegexSchema<Pattern>, RegexOption>;
export declare const PitoRegex: <Pattern extends string>(pattern: Pattern, option?: StrOption | undefined) => PitoStr;
export declare type NumOption = {
    multipleOf?: number;
    minimum?: number;
    exclusiveMinimum?: number | boolean;
    maximum?: number;
    exclusiveMaximum?: number | boolean;
};
export declare type NumSchema = {
    type: 'number';
};
export declare const NumProto: Partial<pito<number, number, NumSchema, NumOption>>;
export declare type PitoNum = pito<number, number, NumSchema, NumOption> & NumSchema & NumOption;
export declare const PitoNum: (option?: NumOption | undefined) => PitoNum;
export declare type IntOption = {
    multipleOf?: number;
    minimum?: number;
    exclusiveMinimum?: number | true;
    maximum?: number;
    exclusiveMaximum?: number | true;
};
export declare type IntSchema = {
    type: 'integer';
};
export declare const IntProto: Partial<pito<number, number, IntSchema, IntOption>>;
export declare type PitoInt = pito<number, number, IntSchema, IntOption>;
export declare const PitoInt: (option?: IntOption | undefined) => PitoInt;
export declare type BoolOption = {};
export declare type BoolSchema = {
    type: 'boolean';
};
export declare const BoolProto: Partial<pito<boolean, boolean, BoolSchema, BoolOption>>;
export declare type PitoBool = pito<boolean, boolean, BoolSchema, BoolOption>;
export declare const PitoBool: () => PitoBool;
//# sourceMappingURL=primitives.d.ts.map