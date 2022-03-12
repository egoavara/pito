import { typio } from "./typio.js"

type ObjectRequired<Properties extends Record<string, typio>> = { [k in keyof Properties]: Properties[k] extends { $optional: true } ? never : k }[keyof Properties]
type ObjectOptionals<Properties extends Record<string, typio>> = { [k in keyof Properties]: Properties[k] extends { $optional: true } ? k : never }[keyof Properties]
type ObjectFromProperties<Properties extends Record<string, typio>, Mode extends '$type' | '$raw'> = { [_ in ObjectRequired<Properties>]: Properties[_][Mode] } & { [_ in ObjectOptionals<Properties>]?: Properties[_][Mode] }
// Derived : Object
// TypioObject is typeof 'object'
export type TypioObject<Properties extends Record<string, typio>> = {
    $symbol: 'TypioObject',
    $type: ObjectFromProperties<Properties, '$type'>,
    $raw: ObjectFromProperties<Properties, '$raw'>,
    $unwrap(raw: ObjectFromProperties<Properties, '$raw'>): ObjectFromProperties<Properties, '$type'>,
    $wrap(raw: ObjectFromProperties<Properties, '$type'>): ObjectFromProperties<Properties, '$raw'>,
    // JSON Schema spec
    type: 'object',
    properties: Properties,
    required: ObjectRequired<Properties>[],
    additionalProperties: true,
}

// Derived : Object
export function TypioObject<Properties extends Record<string, typio>>(props: Properties): TypioObject<Properties> {
    return Object.assign({
        $symbol: 'TypioObject',
        $wrap(raw: any): any {
            for (const k in raw) {
                raw[k] = props[k].$wrap(raw[k])
            }
            return raw
        },
        $unwrap(raw: any): any {
            for (const k in raw) {
                raw[k] = props[k].$unwrap(raw[k])
            }
            return raw
        },
        type: 'object',
        properties: props,
        required: Object.keys(props),
        additionalProperties: true,
    }, {}) as any
}

// Derived : Array
// Array is list of single type
// unlike default js array, TypioArray only support one kind of type 
export type TypioArray<Item extends typio> = {
    $symbol: 'TypioArray',
    $type: Item['$type'][],
    $raw: Item['$raw'][],
    $wrap(raw: Item['$raw'][]): Item['$type'][],
    $unwrap(raw: Item['$type'][]): Item['$raw'][],
    // 
    $inner: Item,
    type: 'array',
    items: Item,
}
// Derived : Array
export function TypioArray<Item extends typio>(inner: Item): TypioArray<Item> {
    return Object.assign({
        $symbol: 'TypioArray',
        type: 'array',
        items: inner,

        $wrap(raw: Item['$raw'][]): Item['$type'][] {
            return raw.map(inner.$wrap)
        },
        $unwrap(raw: Item['$type'][]): Item['$raw'][] {
            return raw.map(inner.$unwrap)
        },
    }, {}) as any
}


