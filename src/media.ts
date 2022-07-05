import { Encoding, isBinaryMediaType, isTextMedia, isTextMediaType, Media, Media as MediaImpl, MediaType } from "./media-utils.js"
import { extendPlugin, pito } from "./pito.js"

// Media-Type
export type MediaTypeOption = {
    contentEncoding: Encoding
}
export type MediaTypeScheme<ContentMediaType extends MediaType> = {
    type: 'string'
    contentMediaType: ContentMediaType
}
export type PitoMediaType<ContentMediaType extends MediaType = MediaType> = pito<string, Media, MediaTypeScheme<ContentMediaType>, MediaTypeOption>
export const PitoMediaType = <ContentMediaType extends MediaType = MediaType, ContentEncoding extends Encoding = 'base64'>(mediaType: ContentMediaType, options?: { encoding?: ContentEncoding }): PitoMediaType<ContentMediaType> => {
    return {
        type: 'string',
        contentMediaType: mediaType,
        contentEncoding: options?.encoding,
        $wrap(data) {
            if (isTextMedia(data)) {
                return data.content
            } else {
                switch (data.encoding) {
                    case '7bit':
                        throw new Error('unimplemented 7bit encoding')
                    case '8bit':
                        throw new Error('unimplemented 8bit encoding')
                    case 'base16':
                        throw new Error('unimplemented base16 encoding')
                    case 'base32':
                        throw new Error('unimplemented base32 encoding')
                    case 'base64':
                        return data.toBuffer().toString('base64')
                    case 'binary':
                        return data.toBuffer().toString('binary')
                    case 'quoted-printable':
                        throw new Error('unimplemented quoted-printable encoding')
                }
            }
        },
        $unwrap(raw) {
            if (isBinaryMediaType(mediaType)) {
                if (options?.encoding === undefined) {
                    throw new Error(`unexpected encoding`)
                }
                return Media(mediaType as any, options?.encoding, raw)
            }
            if (isTextMediaType(mediaType)) {
                return Media(mediaType as any, raw)
            }
            throw new Error()
        },
        $strict(this) {
            return {
                type: 'string',
                contentMediaType: mediaType,
                contentEncoding: options?.encoding,
            }
        },
        $bypass(this) {
            return false
        },
    }
}
//
extendPlugin('Media', PitoMediaType);
declare module './pito' {
    interface PitoPlugin {
        Media: typeof PitoMediaType
    }
    namespace pito {
        type Media<ContentMediaType extends MediaType = MediaType> = pito<string, MediaImpl, MediaTypeScheme<ContentMediaType>, MediaTypeOption>
    }
}