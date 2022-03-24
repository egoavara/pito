import { OptModifier } from "./modifier.js";
import { typio } from "./typio.js";
declare type Required<Properties extends Record<string, typio>> = {
    [k in keyof Properties]: Properties[k] extends OptModifier ? never : k;
}[keyof Properties];
declare type Optionals<Properties extends Record<string, typio>> = {
    [k in keyof Properties]: Properties[k] extends OptModifier ? k : never;
}[keyof Properties];
declare type TypeFromProperties<Properties extends Record<string, typio>> = {
    [K in Required<Properties>]: typio.Type<Properties[K]>;
} & {
    [K in Optionals<Properties>]?: typio.Type<Properties[K]>;
};
declare type RawFromProperties<Properties extends Record<string, typio>> = {
    [K in Required<Properties>]: typio.Raw<Properties[K]>;
} & {
    [K in Optionals<Properties>]?: typio.Raw<Properties[K]>;
};
export declare type ObjOption = {};
export declare type ObjSchema<Properties extends Record<string, typio>> = {
    type: 'object';
    properties: Properties;
    required: (Required<Properties>)[];
    additionalProperties: false;
};
export declare const ObjProto: Partial<typio<Record<string, any>, Record<string, any>, ObjSchema<Record<string, typio>>, ObjOption>>;
export declare type TypioObj<Properties extends Record<string, typio>> = typio<RawFromProperties<Properties>, TypeFromProperties<Properties>, ObjSchema<Properties>, ObjOption>;
export declare const TypioObj: <Properties extends Record<string, typio<any, any, any, any>>>(properties: Properties) => TypioObj<Properties>;
export declare type ArrOption = {};
export declare type ArrSchema = {
    type: 'array';
    items: typio;
};
export declare const ArrProto: Partial<typio<any[], any[], ArrSchema, ArrOption>>;
export declare type TypioArr<Items extends typio> = typio<typio.Raw<Items>, typio.Type<Items>, ArrSchema, ArrOption>;
export declare const TypioArr: <Items extends typio<any, any, any, any>>(items: Items) => TypioArr<Items>;
export {};
//# sourceMappingURL=derived.d.ts.map