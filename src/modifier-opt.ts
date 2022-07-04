import { extendPlugin, pito } from "./pito.js"


// Modifier : Option
export type OptModifier = { $optional: true }
export type PitoOpt<T extends pito> = T & OptModifier
export const PitoOpt = <T extends pito>(inner: T): PitoOpt<T> => {
    return {
        $optional: true,
        ...inner,
    }
}

//
extendPlugin('Opt', PitoOpt)
declare module './pito' {
    interface PitoPlugin {
        Opt: typeof PitoOpt
    }
    namespace pito {
        type Opt<T extends pito> = PitoOpt<T>
    }
}