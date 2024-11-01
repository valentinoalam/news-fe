import api from '@/lib/api';
import { API_CONFIG } from '@/config/api';
import { CreateTagDTO, Tag, TagResponse, UpdateTagDTO } from '@/types/tag';
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

class TagService {
  private readonly endpoint = API_CONFIG.endpoints.tags;

  async getTags(params?: {
    page?: number;
    limit?: number;
    search?: string;
    parentId?: string | null;
  }): Promise<TagResponse> {
    try {
      const { data } = await api.get<TagResponse>(this.endpoint, { params });
      return {
        data: data.data,
        meta: data.meta,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTag(id: number): Promise<Tag> {
    try {
      const { data } = await api.get<Tag>(`${this.endpoint}/${id}`);
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createTag(tagData: CreateTagDTO): Promise<Tag> {
    try {
      const { data } = await api.post<Tag>(this.endpoint, tagData);
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateTag({ id, ...tagData }: UpdateTagDTO): Promise<Tag> {
    try {
      const { data } = await api.patch<Tag>(
        `${this.endpoint}/${id}`,
        tagData
      );
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteTag(id: string): Promise<void> {
    try {
      await api.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async bulkDelete(ids: string[]): Promise<void> {
    try {
      await api.post(`${this.endpoint}/bulk-delete`, { ids });
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

  // Utility method to generate a URL-friendly slug
  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}

export const tagService = new TagService();
