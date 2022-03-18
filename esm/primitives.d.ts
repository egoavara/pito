import { typio } from "./typio.js";
export declare type LitOption = {};
export declare type LitSchema<T extends string | number | boolean> = {
    const: T;
};
export declare const LitProto: typio<string | number | boolean, string | number | boolean, LitSchema<string | number | boolean>, LitOption>;
export declare type TypioLit<T extends string | number | boolean> = typio<T, T, LitSchema<T>, LitOption> & LitSchema<T> & LitOption;
export declare const TypioLit: <T extends string | number | boolean>(l: T) => TypioLit<T>;
export declare type StrOption = {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
};
export declare type StrSchema = {
    type: 'string';
};
export declare const StrProto: typio<string, string, StrSchema, StrOption>;
export declare type TypioStr = typio<string, string, StrSchema, StrOption> & StrSchema & StrOption;
export declare const TypioStr: (option?: StrOption | undefined) => TypioStr;
export declare const TypioRegex: (pattern: string, option?: StrOption | undefined) => TypioStr;
export declare type NumOption = {
    multipleOf?: number;
    minimum?: number;
    exclusiveMinimum?: number | true;
    maximum?: number;
    exclusiveMaximum?: number | true;
};
export declare type NumSchema = {
    type: 'number';
};
export declare const NumProto: typio<number, number, NumSchema, NumOption>;
export declare type TypioNum = typio<number, number, NumSchema, NumOption> & NumSchema & NumOption;
export declare const TypioNum: (option?: NumOption | undefined) => TypioNum;
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
export declare const IntProto: typio<number, number, IntSchema, IntOption>;
export declare type TypioInt = typio<number, number, IntSchema, IntOption> & IntSchema & IntOption;
export declare const TypioInt: (option?: IntOption | undefined) => TypioInt;
export declare type BoolOption = {};
export declare type BoolSchema = {
    type: 'boolean';
};
export declare const BoolProto: typio<boolean, boolean, BoolSchema, BoolOption>;
export declare type TypioBool = typio<boolean, boolean, BoolSchema, BoolOption> & BoolSchema & BoolOption;
export declare const TypioBool: () => TypioBool;
//# sourceMappingURL=primitives.d.ts.map