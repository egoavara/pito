import { PitoDefineBuilder } from "./define.js"
import { Encoding, Media, MediaType } from "./impl/media.js"

// Media-Type
export type MediaTypeOption = {
    mediaType: MediaType,
    encoding?: Encoding
}
export const PitoMediaType = PitoDefineBuilder
    .create(
        { type: 'string' } as const,
        (opt: MediaTypeOption) => {
            if (opt === undefined) {
                throw new Error(`media type require option`)
            }
            return {
                option: {
                },
                extra: {
                    contentMediaType: opt.mediaType,
                    contentEncoding: opt.encoding,
                }
            }
        },
    )
    .build(
        function (raw: Media) { return raw.content },
        function (raw: string) {
            return {
                mediaType: this.contentMediaType,
                content: raw,
                encoding: this.contentEncoding,
                toBuffer: () => {
                    switch (this.contentEncoding) {
                        case "binary":
                            return Buffer.from(raw, "binary")
                        case "base64":
                            return Buffer.from(raw, "base64")
                        case undefined:
                            return Buffer.from(raw, "utf-8")
                        default:
                            throw new Error(`unimplemented encoding :${this.contentEncoding}`)
                    }
                },
            }
        },
    )
export type PitoMediaType = ReturnType<typeof PitoMediaType>