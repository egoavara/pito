import { pito } from "./pito.js"


export type Modifiers =
    & Partial<OptModifier>
// Modifier : Option
export type OptModifier = { $optional: true }
export type PitoOpt<T extends pito> = T & OptModifier
export const PitoOpt = <T extends pito>(inner: T): PitoOpt<T> => {
    return Object.assign(inner, { $optional: true }) as any
}
