import api from '@/lib/api';
import { API_CONFIG } from '@/config/api';
import { CreateCommentDTO, Comment, CommentResponse, UpdateCommentDTO } from '@/types/comment';
import { AxiosError } from 'axios';

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public errors?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class CommentService {
  private readonly endpoint = API_CONFIG.endpoints.comments;

  async getComments(params?: {
    page?: number;
    limit?: number;
    postId?: number; // Filter comments by post ID
  }): Promise<CommentResponse> {
    try {
      const { data } = await api.get<CommentResponse>(this.endpoint, { params });
      return {
        data: data.data,
        meta: data.meta,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getComment(id: number): Promise<Comment> {
    try {
      const { data } = await api.get<Comment>(`${this.endpoint}/${id}`);
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createComment(commentData: CreateCommentDTO): Promise<Comment> {
    try {
      const { data } = await api.post<Comment>(this.endpoint, commentData);
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateComment({ id, ...commentData }: UpdateCommentDTO): Promise<Comment> {
    try {
      const { data } = await api.patch<Comment>(
        `${this.endpoint}/${id}`,
        commentData
      );
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteComment(id: number): Promise<void> {
    try {
      await api.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      const errors = error.response?.data?.errors;

      throw new ApiError(message, status, errors);
    }
    throw new ApiError('An unexpected error occurred'); // General error message
  }
}

export const commentService = new CommentService();
