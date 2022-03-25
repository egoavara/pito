import { pito } from "./pito.js";
export declare type PitoDefineBuilder<DefRaw, DefSchema extends Record<string, any>> = {
    build<DefType, DefOption>(proto: {
        symbol: string;
        wrap(this: pito<DefRaw, DefType, DefSchema, {
            $option?: DefOption;
        }>, raw: DefType): DefRaw;
        unwrap(this: pito<DefRaw, DefType, DefSchema, {
            $option?: DefOption;
        }>, type: DefRaw): DefType;
        strict(this: pito<DefRaw, DefType, DefSchema, {
            $option?: DefOption;
        }>): DefSchema & Record<string, any>;
    }): (option?: DefOption) => pito<DefRaw, DefType, DefSchema, DefOption>;
};
export declare function PitoDefineBuilder<DefRaw extends pito>(raw: DefRaw): PitoDefineBuilder<pito.Type<DefRaw>, pito.Strict<DefRaw>>;
//# sourceMappingURL=define.d.ts.map