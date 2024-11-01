import { Category } from '@/types/category';
import { AppDispatch } from '@/store/store';
import { fetchCategories, loadCategoriesFromStorage } from '@/store/features/categorySlice';
// Utility function to load categories from local storage
export const loadCategoriesFromLocalStorage = (): Category[] => {
  if (localStorage.getItem('categories')) {
    const storedCategories = localStorage.getItem('categories');
    return storedCategories ? JSON.parse(storedCategories) : [];
  }
  return []; // Return an empty array if `localStorage` is unavailable
};

// Utility function to save categories to local storage
export const saveCategoriesToLocalStorage = (categories: Category[]): void => {
  localStorage.setItem('categories', JSON.stringify(categories));
};


// Utility function to load categories from local storage
export const getInitialCategories  = async (dispatch: AppDispatch): Promise<unknown> => {
  if (localStorage.getItem('categories')) {
    return await dispatch(loadCategoriesFromStorage())
  }
  return await dispatch(fetchCategories());
};