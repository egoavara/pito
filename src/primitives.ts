import { pito } from "./pito.js"

// Primitive : Null
export type AnyOption = {}
export type AnySchema = { }
export type PitoAny = pito<null, null, AnySchema, AnyOption>
export const PitoAny = (): PitoAny => {
    return {
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw },
        $strict() { return {} },
    }
}
// Primitive : Null
export type NulOption = {}
export type NulSchema = { type: 'null' }
export type PitoNul = pito<null, null, NulSchema, NulOption>
export const PitoNul = (): PitoNul => {
    return {
        type: 'null',
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw },
        $strict() { return { type: 'null' } },
    }
}

// Primitive : Literal
export type LitOption = {}
export type LitSchema<T extends string | number | boolean> = { const: T }
export type PitoLit<T extends string | number | boolean> = pito<T, T, LitSchema<T>, LitOption>
export const PitoLit = <T extends string | number | boolean>(l: T): PitoLit<T> => {
    return {
        const: l,
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw },
        $strict() { return { const: this.const } },
    }
}
// Primitive : String
export type StrOption = { minLength?: number, maxLength?: number }
export type StrSchema = { type: 'string' }
export type PitoStr = pito<string, string, StrSchema, StrOption>
export const PitoStr = (option?: StrOption): PitoStr => {
    return {
        type: "string",
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw },
        $strict() {
            const strict: StrSchema & StrOption = {
                type: 'string'
            }
            if (this.minLength !== undefined) {
                strict.minLength = this.minLength
            }
            if (this.maxLength !== undefined) {
                strict.maxLength = this.maxLength
            }
            return strict
        },
        ...(option ?? {})
    }
}

// Primitive : Regex String
export type RegexOption = { minLength?: number, maxLength?: number }
export type RegexSchema<P extends string> = { type: 'string', pattern: P }
export type PitoRegex<Pattern extends string = string> = pito<string, string, RegexSchema<Pattern>, RegexOption>
export const PitoRegex = <Pattern extends string>(pattern: Pattern, option?: RegexOption): PitoRegex<Pattern> => {
    return {
        type: 'string',
        pattern: pattern,
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw },
        $strict() {
            return {
                type: 'string',
                pattern: this.pattern,
                ...option
            }
        },
        ...(option ?? {})
    }
}


// Primitive : Number
export type NumOption = {
    multipleOf?: number,
    minimum?: number,
    exclusiveMinimum?: number | boolean,
    maximum?: number
    exclusiveMaximum?: number | boolean
}
export type NumSchema = { type: 'number' }
export type PitoNum = pito<number, number, NumSchema, NumOption> & NumSchema & NumOption
export const PitoNum = (option?: NumOption): PitoNum => {
    return {
        type: 'number',
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw },
        $strict() {
            const strict: NumSchema & NumOption = {
                type: 'number'
            }
            if (this.multipleOf !== undefined) {
                strict.multipleOf = this.multipleOf
            }
            if (this.minimum !== undefined) {
                strict.minimum = this.minimum
            }
            if (this.exclusiveMinimum !== undefined) {
                strict.exclusiveMinimum = this.exclusiveMinimum
            }
            if (this.maximum !== undefined) {
                strict.maximum = this.maximum
            }
            if (this.exclusiveMaximum !== undefined) {
                strict.exclusiveMaximum = this.exclusiveMaximum
            }
            return strict
        },
        ...(option ?? {})
    }
}

// Primitive : Integer
export type IntOption = {
    multipleOf?: number,
    minimum?: number,
    exclusiveMinimum?: number | true,
    maximum?: number
    exclusiveMaximum?: number | true
}
export type IntSchema = { type: 'integer' }
export type PitoInt = pito<number, number, IntSchema, IntOption>
export const PitoInt = (option?: IntOption): PitoInt => {
    return {
        type: 'integer',
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw },
        $strict() {
            const strict: IntSchema & IntOption = {
                type: 'integer'
            }
            if (this.multipleOf !== undefined) {
                strict.multipleOf = this.multipleOf
            }
            if (this.minimum !== undefined) {
                strict.minimum = this.minimum
            }
            if (this.exclusiveMinimum !== undefined) {
                strict.exclusiveMinimum = this.exclusiveMinimum
            }
            if (this.maximum !== undefined) {
                strict.maximum = this.maximum
            }
            if (this.exclusiveMaximum !== undefined) {
                strict.exclusiveMaximum = this.exclusiveMaximum
            }
            return strict
        },
        ...(option ?? {})
    }
}

// Primitive : Boolean
export type BoolOption = {}
export type BoolSchema = { type: 'boolean' }
export type PitoBool = pito<boolean, boolean, BoolSchema, BoolOption>
export const PitoBool = (): PitoBool => {
    return {
        type : "boolean",
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw },
        $strict() {
            return { type: 'boolean' }
        },
    }
}