import { PitoObj } from "./obj.js"
import { extendPlugin, pito } from "./pito.js"


export type PitoExtends<PitoOrigin, Extends extends Record<string, pito>> = PitoOrigin extends PitoObj<infer Origin> ? PitoObj<Omit<Origin, keyof Extends & string> & Extends> : never
export function PitoExtends<Origin extends PitoObj<any>, Extends extends Record<string, pito>>(origin: Origin, properties: Extends): Origin extends PitoObj<infer Origin> ? PitoObj<Omit<Origin, keyof Extends> & Extends> : never {
    return PitoObj(Object.assign(origin.properties, properties)) as any
}

//
extendPlugin('Extends', PitoExtends)
declare module './pito' {
    interface PitoPlugin {
        Extends: typeof PitoExtends
    }
    namespace pito {
        type Extends<PitoOrigin, Extends extends TSRecord<string, pito>> = PitoOrigin extends PitoObj<infer Origin> ? PitoObj<Omit<Origin, keyof Extends & string> & Extends> : never
    }
}