export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId: string | null;
  count: number;
  children?: Category[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryParams {
  page?: number;
  limit?: number;
  search?: string;
  parentId?: string | null;
}
export interface CategoryState {
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  lastFetched: number | null; // Store as timestamp instead of Date
  error: string | null;
}
export interface CreateCategoryDTO {
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
}

export interface UpdateCategoryDTO extends Partial<CreateCategoryDTO> {
  id: string;
}

export interface CategoryResponse {
  records: Category[];
  meta?: {
    success: boolean;
    totalRecords: number;
    message: string;
  };
}