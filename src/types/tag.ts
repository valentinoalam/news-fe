export interface Tag {
    id: string;         // Unique identifier for the tag
    name: string;       // Name of the tag
    slug: string
}

export interface TagResponse {
    data: Tag[];         // Array of Tag objects
    meta: {
        total: number;       // Total number of tags (for pagination)
        status: string;      // Status of the response, e.g., 'success' or 'error'
        message?: string;    // Optional message for additional information
    }

}

export interface CreateTagDTO {
    name: string;
    slug: string;
}

export interface UpdateTagDTO extends Partial<CreateTagDTO> {
    id: string;
  }
  