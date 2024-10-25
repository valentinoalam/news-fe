export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    parentId: number | null;
    count: number;
    children?: Category[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CreateCategoryDTO {
    name: string;
    slug: string;
    description?: string;
    parentId?: number | null;
  }
  
  export interface UpdateCategoryDTO extends Partial<CreateCategoryDTO> {
    id: number;
  }