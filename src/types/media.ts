export interface Media {
    id: string;
    url: string;
    type: 'image' | 'video' | 'document';
    filename: string;
    size: number;
    metadata?: Record<string, unknown>;
}