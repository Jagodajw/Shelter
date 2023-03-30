export type FileReaderMimeType =
    | 'application/pdf'
    | 'image/avif'
    | 'image/gif'
    | 'image/jpeg'
    | 'image/png'
    | 'image/svg+xml'
    | 'image/webp';

export const fileReaderAcceptableFormats: FileReaderMimeType[] = [
    'application/pdf',
    'image/avif',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/webp',
];

export function hasAttachmentAcceptableFormat(mimeType: string): boolean {
    return fileReaderAcceptableFormats.some(
        (format: string) => format === mimeType,
    );
}
