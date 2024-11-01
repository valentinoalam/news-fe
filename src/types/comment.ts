
export interface CommentState {
    comments: Comment[];
}

interface Comment {
    id: string;
    articleId: string;
    parentId: string;
    content: string;
    createdAt: Date;
    author: {
      name: string;
      avatar: string;
    };
    replies?: Comment[];
}

export interface CommentResponse {
data: Comment[]; // Array of comments
meta: {
    total: number; // Total number of comments
    page: number; // Current page
    limit: number; // Number of comments per page
};
}

export interface CreateCommentDTO {
articleId: string; // ID of the post to associate with the comment
content: string; // Name of the commenter
authorId: string; // Email of the commenter
parentId: string; // The comment content
}

export interface UpdateCommentDTO extends Partial<CreateCommentDTO> {
id: string; // ID of the comment to update
}
