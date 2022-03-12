import { typio } from "./typio.js";
export declare type Modifier = {
    $optional?: boolean;
};
export declare type TypioOption<T extends typio> = T & {
    $optional: true;
};
export declare function TypioOption<T extends typio>(inner: T): TypioOption<T>;
//# sourceMappingURL=modifier.d.ts.map