import { typio } from "./typio.js"


export type Modifier = {
    $optional? : boolean,
}
// Modifier : Option
// Optional type of type 
export type TypioOption<T extends typio> = T & { $optional: true }

// Modifier : Option
export function TypioOption<T extends typio>(inner: T): TypioOption<T> {
    return Object.assign(inner, {$optional : true}) as any
}