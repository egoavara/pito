
import { pito } from "./pito.js"

export type PitoExtends<PitoOrigin, Extends extends Record<string, pito>> = PitoOrigin extends pito.Obj<infer Origin> ? pito.Obj<Omit<Origin, keyof Extends> & Extends> : never
export function PitoExtends<Origin extends pito.Obj<any>, Extends extends Record<string, pito>>(origin: Origin, properties: Extends): Origin extends pito.Obj<infer Origin> ? pito.Obj<Omit<Origin, keyof Extends> & Extends> : never {
    return pito.Obj(Object.assign(origin.properties, properties)) as any
}
