import { typio } from "./typio.js";
declare type ObjectRequired<Properties extends Record<string, typio>> = {
    [k in keyof Properties]: Properties[k] extends {
        $optional: true;
    } ? never : k;
}[keyof Properties];
declare type ObjectOptionals<Properties extends Record<string, typio>> = {
    [k in keyof Properties]: Properties[k] extends {
        $optional: true;
    } ? k : never;
}[keyof Properties];
declare type ObjectFromProperties<Properties extends Record<string, typio>, Mode extends '$type' | '$raw'> = {
    [_ in ObjectRequired<Properties>]: Properties[_][Mode];
} & {
    [_ in ObjectOptionals<Properties>]?: Properties[_][Mode];
};
export declare type TypioObject<Properties extends Record<string, typio>> = {
    $symbol: 'TypioObject';
    $type: ObjectFromProperties<Properties, '$type'>;
    $raw: ObjectFromProperties<Properties, '$raw'>;
    $unwrap(raw: ObjectFromProperties<Properties, '$raw'>): ObjectFromProperties<Properties, '$type'>;
    $wrap(raw: ObjectFromProperties<Properties, '$type'>): ObjectFromProperties<Properties, '$raw'>;
    type: 'object';
    properties: Properties;
    required: ObjectRequired<Properties>[];
    additionalProperties: true;
};
export declare function TypioObject<Properties extends Record<string, typio>>(props: Properties): TypioObject<Properties>;
export declare type TypioArray<Item extends typio> = {
    $symbol: 'TypioArray';
    $type: Item['$type'][];
    $raw: Item['$raw'][];
    $wrap(raw: Item['$raw'][]): Item['$type'][];
    $unwrap(raw: Item['$type'][]): Item['$raw'][];
    $inner: Item;
    type: 'array';
    items: Item;
};
export declare function TypioArray<Item extends typio>(inner: Item): TypioArray<Item>;
export {};
//# sourceMappingURL=derived.d.ts.map