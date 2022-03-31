import { pito } from "./pito.js"

// Primitive : Null
export type NulOption = {}
export type NulSchema = { type: 'null' }
export const NullProto: Partial<pito<null, null, NulSchema, NulOption>> = {
    $wrap(raw) { return raw },
    $unwrap(raw) { return raw },
    $strict() { return { type: 'null' } },
}
export type PitoNul = pito<null, null, NulSchema, NulOption>
export const PitoNul = (): PitoNul => { return Object.create(NullProto, { type: { enumerable: true, value: 'null' } }) }

// Primitive : Literal
export type LitOption = {}
export type LitSchema<T extends string | number | boolean> = { const: T }
export const LitProto: Partial<pito<string | number | boolean, string | number | boolean, LitSchema<string | number | boolean>, LitOption>> = {
    $wrap(raw) { return raw },
    $unwrap(raw) { return raw },
    $strict() { return { const: this.const } },
}
export type PitoLit<T extends string | number | boolean> = pito<T, T, LitSchema<T>, LitOption>
export const PitoLit = <T extends string | number | boolean>(l: T): PitoLit<T> => {
    return Object.create(LitProto, { const: { enumerable: true, value: l }, })
}
// Primitive : String
export type StrOption = { minLength?: number, maxLength?: number }
export type StrSchema = { type: 'string' }
export const StrProto: Partial<pito<string, string, StrSchema, StrOption>> = {
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
}
export type PitoStr = pito<string, string, StrSchema, StrOption>
export const PitoStr = (option?: StrOption): PitoStr => {
    if (option === undefined) {
        return Object.create(StrProto, { type: { value: 'string' } })
    }
    return Object.assign(Object.create(StrProto, { type: { value: 'string' } }), option)
}

// Primitive : Regex String
export type RegexOption = { minLength?: number, maxLength?: number }
export type RegexSchema<P extends string> = { type: 'string', pattern: P }
export const RegexProto: Partial<pito<string, string, RegexSchema<string>, RegexOption>> = {
    $wrap(raw) { return raw },
    $unwrap(raw) { return raw },
    $strict() {
        const strict: RegexSchema<string> & RegexOption = {
            type: 'string',
            pattern: this.pattern,
        }
        if (this.minLength !== undefined) {
            strict.minLength = this.minLength
        }
        if (this.maxLength !== undefined) {
            strict.maxLength = this.maxLength
        }
        return strict
    },
}
export type PitoRegex<Pattern extends string = string> = pito<string, string, RegexSchema<Pattern>, RegexOption>
export const PitoRegex = <Pattern extends string>(pattern: Pattern, option?: RegexOption): PitoRegex<Pattern> => {
    return Object.assign(
        Object.create(
            RegexProto,
            {
                type: { enumerable: true, value: 'string' },
                pattern: { enumerable: true, value: pattern },
            }
        ),
        option ?? {},
    )
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
export const NumProto: Partial<pito<number, number, NumSchema, NumOption>> = {
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
}
export type PitoNum = pito<number, number, NumSchema, NumOption> & NumSchema & NumOption
export const PitoNum = (option?: NumOption): PitoNum => {
    if (option === undefined) {
        return Object.create(NumProto, { type: { value: 'number' } })
    }
    return Object.assign(Object.create(NumProto, { type: { value: 'number' } }), option)
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
export const IntProto: Partial<pito<number, number, IntSchema, IntOption>> = {
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
}
export type PitoInt = pito<number, number, IntSchema, IntOption>
export const PitoInt = (option?: IntOption): PitoInt => {
    if (option === undefined) {
        return Object.create(IntProto, { type: { value: 'integer' } })
    }
    return Object.assign(Object.create(IntProto, { type: { value: 'integer' } }), option)
}

// Primitive : Boolean
export type BoolOption = {}
export type BoolSchema = { type: 'boolean' }
export const BoolProto: Partial<pito<boolean, boolean, BoolSchema, BoolOption>> = {
    $wrap(raw) { return raw },
    $unwrap(raw) { return raw },
    $strict() {
        return { type: 'boolean' }
    },
}
export type PitoBool = pito<boolean, boolean, BoolSchema, BoolOption>
export const PitoBool = (): PitoBool => { return Object.create(BoolProto, { type: { value: 'boolean' } }) }