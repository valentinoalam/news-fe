import { File } from "buffer";

export interface Article {
    id: string;
    title: string;
    description: string;
    status: string;
    excerpt: string;
    tags?: string[]
    content: object[];
    isFeatured: boolean;
    featuredImage: string;
    images?: File[];
    categoryId: string;
    authorId: string;
    revision: number;
    revisions?: ArticleRevision[];
    author?: {
        name: string;
        avatar: string;
    };
    category?: {
        name: string;
    };
    publishedAt?: Date;
}

export interface ArticleRevision {
    id: string;
    articleId: string;
    content: string;
    revision: number;
    timestamp: Date;
}

export interface ArticleResponse {
    data: Article[];
    meta?: {
      total: number;
      page: number;
      limit: number;
    };
}