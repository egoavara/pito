import { pito, plugin } from "./pito.js"

// Primitive : Any
export type AnyOption = {}
export type AnySchema = {}
export type PitoAny = pito<any, any, AnySchema, AnyOption>
export const PitoAny = (): PitoAny => {
    return {
        $typeof: 'any',
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw },
        $strict() { return {} },
        $bypass() { return true },
    }
}
// Primitive : Null
export type NulOption = {}
export type NulSchema = { type: 'null' }
export type PitoNul = pito<null, null, NulSchema, NulOption>
export const PitoNul = (): PitoNul => {
    return {
        type: 'null',
        $typeof: 'null',
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw },
        $strict() { return { type: 'null' } },
        $bypass() { return true },
    }
}

// Primitive : Literal
export type LitOption = {}
export type LitSchema<T extends string | number> = { const: T }
export type PitoLit<T extends string | number> = pito<T, T, LitSchema<T>, LitOption>
export const PitoLit = <T extends string | number>(l: T): PitoLit<T> => {
    return {
        const: l,
        $typeof: 'literal',
        $const: l,
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw },
        $strict() { return { const: this.const } },
        $bypass() { return true },
    }
}
// Primitive : String
export type StrOption = { minLength?: number, maxLength?: number }
export type StrSchema = { type: 'string' }
export type PitoStr = pito<string, string, StrSchema, StrOption>
export const PitoStr = (option?: StrOption): PitoStr => {
    return {
        type: "string",
        $typeof: 'string',
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
        $bypass() { return true },
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
        $typeof: 'string',
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw },
        $strict() {
            return {
                type: 'string',
                pattern: this.pattern,
                ...option
            }
        },
        $bypass() { return true },
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
        $typeof: 'number',
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
        $bypass() { return true },
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
        $typeof: 'number',
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
        $bypass() { return true },
        ...(option ?? {})
    }
}

// Primitive : Boolean
export type BoolOption = {}
export type BoolSchema = { type: 'boolean' }
export type PitoBool = pito<boolean, boolean, BoolSchema, BoolOption>
export const PitoBool = (): PitoBool => {
    return {
        type: "boolean",
        $typeof: 'boolean',
        $wrap(raw) { return raw },
        $unwrap(raw) { return raw },
        $strict() {
            return { type: 'boolean' }
        },
        $bypass() { return true },
    }
}

// 