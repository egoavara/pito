// Std-Primitive : Integer
// Integer support max, min, default, etc
export type TypioIntegerOption = {
    minimum?: number,           // >= 
    exclusiveMinimum?: boolean  // >
    maximum?: number,           // <=
    exclusiveMaximum?: boolean  // <
    default?: number            //
}


// Std-Primitive : Regex
export type TypioRegex = {
    $symbol: 'TypioRegex',
    $type: string,
    $raw: string,
    $wrap(raw: string): string,
    $unwrap(raw: string): string,
    // 
    type: 'string',
    pattern: string,
}

// Std-Primitive : Integer
export type TypioInteger = {
    $symbol: 'TypioInteger',
    $type: number,
    $raw: number,
    $wrap(raw: number): number,
    $unwrap(raw: number): number,
    // 
    type: 'integer',
}

// Std-Primitive : Regex
export function TypioRegex(pattern: string): TypioRegex {
    return Object.assign({
        $symbol: 'TypioRegex',
        $wrap(raw: string): string {
            return raw
        },
        $unwrap(raw: string): string {
            return raw
        },
        type: 'string',
        pattern,
    }, {}) as any
}


// Std-Primitive : Integer
export function TypioInteger<Option extends TypioIntegerOption = {}>(option?: Option): TypioInteger & Option {
    return Object.assign({
        $symbol: 'TypioInteger',
        $wrap(raw: number): number {
            return raw
        },
        $unwrap(raw: number): number {
            return raw
        },
        type: 'integer',
    }, option ?? {}) as any
}
