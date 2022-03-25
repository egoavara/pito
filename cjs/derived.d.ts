import { OptModifier } from "./modifier.js";
import { pito } from "./pito.js";
declare type Required<Properties extends Record<string, pito>> = {
    [k in keyof Properties]: Properties[k] extends OptModifier ? never : k;
}[keyof Properties];
declare type Optionals<Properties extends Record<string, pito>> = {
    [k in keyof Properties]: Properties[k] extends OptModifier ? k : never;
}[keyof Properties];
declare type TypeFromProperties<Properties extends Record<string, pito>> = {
    [K in Required<Properties>]: pito.Type<Properties[K]>;
} & {
    [K in Optionals<Properties>]?: pito.Type<Properties[K]>;
};
declare type RawFromProperties<Properties extends Record<string, pito>> = {
    [K in Required<Properties>]: pito.Raw<Properties[K]>;
} & {
    [K in Optionals<Properties>]?: pito.Raw<Properties[K]>;
};
export declare type ObjOption = {};
export declare type ObjSchema<Properties extends Record<string, pito>> = {
    type: 'object';
    properties: Properties;
    required: (Required<Properties>)[];
    additionalProperties: false;
};
export declare const ObjProto: Partial<pito<Record<string, any>, Record<string, any>, ObjSchema<Record<string, pito>>, ObjOption>>;
export declare type PitoObj<Properties extends Record<string, pito>> = pito<RawFromProperties<Properties>, TypeFromProperties<Properties>, ObjSchema<Properties>, ObjOption>;
export declare const PitoObj: <Properties extends Record<string, pito<any, any, any, any, {}>>>(properties: Properties) => PitoObj<Properties>;
export declare type ArrOption = {};
export declare type ArrSchema = {
    type: 'array';
    items: pito;
};
export declare const ArrProto: Partial<pito<any[], any[], ArrSchema, ArrOption>>;
export declare type PitoArr<Items extends pito> = pito<pito.Raw<Items>[], pito.Type<Items>[], ArrSchema, ArrOption>;
export declare const PitoArr: <Items extends pito<any, any, any, any, {}>>(items: Items, option?: ArrOption | undefined) => PitoArr<Items>;
declare type ParsePitoUnionObj<Key extends string, Items extends Record<string, pito.obj<Record<string, pito>>>> = {
    [ItemKey in keyof Items]: Items[ItemKey] extends pito.obj<infer A> ? (ItemKey extends string ? pito.obj<A & Record<Key, pito.lit<ItemKey>>> : never) : never;
}[keyof Items];
export declare type UnionObjOption = {};
export declare type UnionObjSchema<Key extends string, Items extends Record<string, PitoObj<Record<string, pito>>>> = {
    anyOf: any[];
};
export declare const UnionObjProto: Partial<pito<any, any, UnionObjSchema<string, Record<string, PitoObj<Record<string, pito>>>>, UnionObjOption>>;
export declare type PitoUnionObj<Key extends string, Items extends Record<string, PitoObj<Record<string, pito>>>> = pito<pito.Raw<ParsePitoUnionObj<Key, Items>>, pito.Type<ParsePitoUnionObj<Key, Items>>, UnionObjSchema<Key, Items>, UnionObjOption>;
export declare const PitoUnionObj: <Key extends string, Items extends Record<string, PitoObj<Record<string, pito<any, any, any, any, {}>>>>>(key: Key, items: Items) => PitoUnionObj<Key, Items>;
export {};
//# sourceMappingURL=derived.d.ts.map