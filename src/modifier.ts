import { typio } from "./typio.js"


export type Modifiers =
    & Partial<OptModifier>
// Modifier : Option
export type OptModifier = { $optional: true }
export type TypioOpt<T extends typio> = T & OptModifier
export const TypioOpt = <T extends typio>(inner: T): TypioOpt<T> => {
    return Object.assign(inner, { $optional: true }) as any
}
