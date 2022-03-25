import { pito } from "./pito.js";
export declare type Modifiers = Partial<OptModifier>;
export declare type OptModifier = {
    $optional: true;
};
export declare type PitoOpt<T extends pito> = T & OptModifier;
export declare const PitoOpt: <T extends pito<any, any, any, any, {}>>(inner: T) => PitoOpt<T>;
//# sourceMappingURL=modifier.d.ts.map