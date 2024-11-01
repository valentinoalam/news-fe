import api from '@/lib/api';
import { API_CONFIG } from '@/config/api';
import { 
    Category,
    CategoryResponse,
    CreateCategoryDTO, 
    UpdateCategoryDTO 
} from '@/types/category';
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
class CategoryService {
    private readonly endpoint = API_CONFIG.endpoints.categories;

    async getCategories(params?: {
      page?: number;
      limit?: number;
      search?: string;
      parentId?: string | null;
    }): Promise<CategoryResponse> {
      try {
        const { data } = await api.get(this.endpoint, { params });
        const { success, totalRecords, message } = data;
        const meta = {
          success,
          totalRecords,
          message
        };
        const records = data.data;
        return {records, meta}
      } catch (error) {
        this.handleError(error);
      }
    }
  
    async getCategory(id: number): Promise<Category> {
      try {
        const { data } = await api.get<Category>(`${this.endpoint}/${id}`);
        return data;
      } catch (error) {
        this.handleError(error);
      }
    }
  
    async createCategory(categoryData: CreateCategoryDTO): Promise<Category> {
      try {
        const { data } = await api.post<Category>(this.endpoint, categoryData);
        return data;
      } catch (error) {
        this.handleError(error);
      }
    }
  
    async updateCategory({ id, ...categoryData }: UpdateCategoryDTO): Promise<Category> {
      try {
        const { data } = await api.patch<Category>(
          `${this.endpoint}/${id}`,
          categoryData
        );
        return data;
      } catch (error) {
        this.handleError(error);
      }
    }
  
    async deleteCategory(id: number): Promise<void> {
      try {
        await api.delete(`${this.endpoint}/${id}`);
      } catch (error) {
        this.handleError(error);
      }
    }
  
    async bulkDelete(ids: number[]): Promise<void> {
      try {
        await api.post(`${this.endpoint}/bulk-delete`, { ids });
      } catch (error) {
        this.handleError(error);
      }
    }
  
    async reorderCategories(orderedIds: { id: number; position: number }[]): Promise<void> {
      try {
        await api.post(`${this.endpoint}/reorder`, { orderedIds });
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
      throw error;
    }
    
    // Utility method to generate a URL-friendly slug
    generateSlug(name: string): string {
        return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
}

export const categoryService = new CategoryService();

