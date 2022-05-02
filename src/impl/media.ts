export type TextMediaType =
    | `application/json`
    | `application/ld+json`
    | `application/xml`
    | `text/plain`
    | `text/css`
    | `text/csv`
    | `text/html`
    | `text/javascript`
    | (string & Record<never, never>)
export type BinaryMediaType =
    | `audio/aac`
    | `audio/midi`
    | `audio/mpeg`
    | `audio/ogg`
    | `audio/opus`
    | `audio/wav`
    | `audio/webm`
    | `image/avif`
    | `image/bmp`
    | `image/gif`
    | `image/jpeg`
    | `image/png`
    | `image/tiff`
    | `image/webp`
    | `image/svg+xml`
    | `video/x-msvideo`
    | `video/mp4`
    | `video/mpeg`
    | `video/ogg`
    | `video/webm`
    | `application/gzip`
    | `application/octet-stream`
    | `application/pdf`
    | `application/zip`
    | `font/otf`
    | `font/otf`
    | `font/woff`
    | `font/woff2`
    | (string & Record<never, never>)
export type MediaType = TextMediaType | BinaryMediaType
export type Encoding =
    | `7bit`
    | `8bit`
    | `binary`
    | `quoted-printable`
    | `base16`
    | `base32`
    | `base64`
type BaseMedia = {
    toBuffer():Buffer
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