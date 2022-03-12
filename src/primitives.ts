// Primitive : Literal
export type TypioLiteral<L extends string | number | boolean> = {
    $symbol: 'TypioLiteral',
    $type: L,
    $raw: L,
    $unwrap(raw: L): L,
    $wrap(raw: L): L,
    // 
    const: L,
}

// Primitive : String
export type TypioString = {
    $symbol: 'TypioString',
    $type: string,
    $raw: string,
    $unwrap(raw: string): string,
    $wrap(raw: string): string,
    // 
    type: 'string',
}

// Primitive : Number
// Number support max, min, default, etc
export type TypioNumberOption = {
    minimum?: number,           // >= 
    exclusiveMinimum?: boolean  // >
    maximum?: number,           // <=
    exclusiveMaximum?: boolean  // <
    default?: number            //
}

// Primitive : Number
export type TypioNumber = {
    $symbol: 'TypioNumber',
    $type: number,
    $raw: number,
    $unwrap(raw: number): number,
    $wrap(raw: number): number,
    // 
    type: 'number',
}

// Primitive : Number
export type TypioBoolean = {
    $symbol: 'TypioBoolean',
    $type: boolean,
    $raw: boolean,
    $unwrap(raw: boolean): boolean,
    $wrap(raw: boolean): boolean,
    // 
    type: 'boolean',
}

// Primitive : Literal
export function TypioLiteral<L extends string | number | boolean>(l: L): TypioLiteral<L> {
    return {
        $symbol: 'TypioLiteral',
        $unwrap(raw: L): L {
            return raw
        },
        $wrap(raw: L): L {
            return raw
        },
        const: l,

    } as any
}


// Primitive : String
export function TypioString(): TypioString {
    return Object.assign({
        $symbol: 'TypioString',
        $unwrap(raw: string): string {
            return raw
        },
        $wrap(raw: string): string {
            return raw
        },
        type: 'string',
    }, {}) as any
}

// Primitive : Number
export function TypioNumber<Option extends TypioNumberOption = {}>(option?: Option): TypioNumber & Option {
    return Object.assign({
        $symbol: 'TypioNumber',
        $unwrap(raw: number): number {
            return raw
        },
        $wrap(raw: number): number {
            return raw
        },
        type: 'number',
    }, option ?? {}) as any
}

// Primitive : Boolean
export function TypioBoolean() {
    return Object.assign({
        $symbol: 'TypioBoolean',
        $unwrap(raw: boolean): boolean {
            return raw
        },
        $wrap(raw: boolean): boolean {
            return raw
        },
        type: 'boolean',
    }, {}) as any
}
