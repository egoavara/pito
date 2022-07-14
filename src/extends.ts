import { PitoObj } from "./obj.js"
import { pito } from "./pito.js"


export type PitoExtends<PitoOrigin, Extends extends Record<string, pito>> = PitoOrigin extends PitoObj<infer Origin> ? PitoObj<Omit<Origin, keyof Extends & string> & Extends> : never



export function PitoExtends<Origin extends PitoObj<any>, Extends extends Record<string, pito>>(origin: Origin, properties: Extends): Origin extends PitoObj<infer Origin> ? PitoObj<Omit<Origin, keyof Extends> & Extends> : never {
    return PitoObj(Object.assign({}, origin.properties, properties)) as any
}
