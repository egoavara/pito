import { typio } from "./typio.js"

// Primitive : Lit
export type LitOption = {}
export type LitSchema<T extends string | number | boolean> = { const: T }
export const LitProto: typio<string | number | boolean, string | number | boolean, LitSchema<string | number | boolean>, LitOption> = {
    $symbol: 'TypioLit',
    $wrap(raw) { return raw },
    $unwrap(raw) { return raw },
    $strict() { return { const: this.const } },

}
export type TypioLit<T extends string | number | boolean> = typio<T, T, LitSchema<T>, LitOption> & LitSchema<T> & LitOption
export const TypioLit = <T extends string | number | boolean>(l: T): TypioLit<T> => {
    return Object.create(LitProto, { const: { value: l }, })
}
// Primitive : Str
export type StrOption = { minLength?: number, maxLength?: number, pattern?: string }
export type StrSchema = { type: 'string' }
export const StrProto: typio<string, string, StrSchema, StrOption> = {
    $symbol: 'TypioStr',
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
        if (this.pattern !== undefined) {
            strict.pattern = this.pattern
        }
        return strict
    },
}
export type TypioStr = typio<string, string, StrSchema, StrOption> & StrSchema & StrOption
export const TypioStr = (option?: StrOption): TypioStr => {
    if (option === undefined) {
        return Object.create(StrProto, { type: { value: 'string' } })
    }
    return Object.assign(Object.create(StrProto, { type: { value: 'string' } }), option)
}

export const TypioRegex = (pattern: string, option?: StrOption): TypioStr => {
    return Object.assign(Object.create(StrProto, { type: { value: 'string' } }), option, { pattern: pattern })
}


// Primitive : Num
export type NumOption = {
    multipleOf?: number,
    minimum?: number,
    exclusiveMinimum?: number | true,
    maximum?: number
    exclusiveMaximum?: number | true
}
export type NumSchema = { type: 'number' }
export const NumProto: typio<number, number, NumSchema, NumOption> = {
    $symbol: 'TypioNum',
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
export type TypioNum = typio<number, number, NumSchema, NumOption> & NumSchema & NumOption
export const TypioNum = (option?: NumOption): TypioNum => {
    if (option === undefined) {
        return Object.create(NumProto, { type: { value: 'number' } })
    }
    return Object.assign(Object.create(NumProto, { type: { value: 'number' } }), option)
}

// Primitive : Int
export type IntOption = {
    multipleOf?: number,
    minimum?: number,
    exclusiveMinimum?: number | true,
    maximum?: number
    exclusiveMaximum?: number | true
}
export type IntSchema = { type: 'integer' }
export const IntProto: typio<number, number, IntSchema, IntOption> = {
    $symbol: 'TypioInt',
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
export type TypioInt = typio<number, number, IntSchema, IntOption> & IntSchema & IntOption
export const TypioInt = (option?: IntOption): TypioInt => {
    if (option === undefined) {
        return Object.create(IntProto, { type: { value: 'integer' } })
    }
    return Object.assign(Object.create(IntProto, { type: { value: 'integer' } }), option)
}

// Primitive : Bool
export type BoolOption = {}
export type BoolSchema = { type: 'boolean' }
export const BoolProto: typio<boolean, boolean, BoolSchema, BoolOption> = {
    $symbol: 'TypioBool',
    $wrap(raw) { return raw },
    $unwrap(raw) { return raw },
    $strict() {
        return { type: 'boolean' }
    },
}
export type TypioBool = typio<boolean, boolean, BoolSchema, BoolOption> & BoolSchema & BoolOption
export const TypioBool = (): TypioBool => { return Object.create(BoolProto, { type: { value: 'boolean' } }) }