import { BinaryMediaType, Encoding, isBinaryMediaType, isMediaType, isTextMediaType, TextMediaType } from "./media-utils.js"


export type BaseMedia = {
    toBlob(): Promise<Blob>
    toBuffer(): Promise<ArrayBuffer>
}

export type TextMedia = {
    mediaType: TextMediaType
    content: string
} & BaseMedia

export type BinaryMedia = {
    mediaType: BinaryMediaType
    encoding: Encoding
    content: string
} & BaseMedia

export type Media = TextMedia | BinaryMedia

export function isMedia(media: any): media is Media { return typeof media === 'object' && media !== null && 'mediaType' in media && typeof media.mediaType === 'string' && isMediaType(media.mediaType) }
export function isTextMedia(media: any): media is TextMedia { return typeof media === 'object' && media !== null && 'mediaType' in media && typeof media.mediaType === 'string' && isTextMediaType(media.mediaType) }
export function isBinaryMedia(media: any): media is BinaryMedia { return typeof media === 'object' && media !== null && 'mediaType' in media && typeof media.mediaType === 'string' && isBinaryMediaType(media.mediaType) }

export function Media(mediaType: TextMedia, contents: string): TextMedia;
export function Media(mediaType: BinaryMedia, encoding: Encoding, contents: Buffer | string): BinaryMedia;
export function Media(...args: any[]): Media {
    const cmt = args[0]
    if (isBinaryMediaType(cmt)) {
        const ce = args[1]
        const cnt = args[2]
        return {
            mediaType: cmt,
            encoding: ce,
            content: cnt instanceof Buffer ? cnt.toString(ce) : cnt,
            async toBlob() {
                return new Blob([await this.toBuffer()], { type: this.mediaType })
            },
            async toBuffer() {
                return Uint8Array.from(atob(this.content), c => c.charCodeAt(0))
            },
        }
    }
    if (isTextMediaType(cmt)) {
        const cnt = args[1]
        return {
            mediaType: cmt,
            content: cnt,
            async toBlob() {
                return new Blob([await this.toBuffer()], { type: this.mediaType })
            },
            async toBuffer() {
                return Uint8Array.from(this.content, c => c.charCodeAt(0))
            },
        }
    }
    throw new Error(`unexpected '${args[0]}' media type`)
}

export { };