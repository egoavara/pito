import { typio } from "./typio.js";
export declare type Modifiers = Partial<OptModifier>;
export declare type OptModifier = {
    $optional: true;
};
export declare type TypioOpt<T extends typio> = T & OptModifier;
export declare const TypioOpt: <T extends typio<any, any, any, any>>(inner: T) => TypioOpt<T>;
//# sourceMappingURL=modifier.d.ts.map