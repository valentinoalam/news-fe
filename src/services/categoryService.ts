import { Category, CreateCategoryDTO, UpdateCategoryDTO } from '@/types/category';

class CategoryService {
    private readonly baseUrl = '/api/categories';

    async getCategories(): Promise<Category[]> {
        try {
        const response = await fetch(this.baseUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        return this.buildCategoryTree(data);
        } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
        }
    }

    async getCategory(id: number): Promise<Category> {
        try {
        const response = await fetch(`${this.baseUrl}/${id}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch category');
        }

        return await response.json();
        } catch (error) {
        console.error(`Error fetching category ${id}:`, error);
        throw error;
        }
    }

    async createCategory(data: CreateCategoryDTO): Promise<Category> {
        try {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create category');
        }

        return await response.json();
        } catch (error) {
        console.error('Error creating category:', error);
        throw error;
        }
    }

    async updateCategory(data: UpdateCategoryDTO): Promise<Category> {
        try {
        const response = await fetch(`${this.baseUrl}/${data.id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update category');
        }

        return await response.json();
        } catch (error) {
        console.error(`Error updating category ${data.id}:`, error);
        throw error;
        }
    }

    async deleteCategory(id: number): Promise<void> {
        try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete category');
        }
        } catch (error) {
        console.error(`Error deleting category ${id}:`, error);
        throw error;
        }
    }

    private buildCategoryTree(categories: Category[]): Category[] {
        const categoryMap = new Map<number, Category>();
        const rootCategories: Category[] = [];

        // First pass: create map of all categories
        categories.forEach(category => {
        categoryMap.set(category.id, { ...category, children: [] });
        });

        // Second pass: build tree structure
        categories.forEach(category => {
            const currentCategory = categoryMap.get(category.id)!;
            
            if (category.parentId === null) {
                rootCategories.push(currentCategory);
            } else {
                const parentCategory = categoryMap.get(category.parentId);
                if (parentCategory) {
                parentCategory.children = parentCategory.children || [];
                parentCategory.children.push(currentCategory);
                }
            }
        });

        return rootCategories;
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