import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, CategoryResponse, CategoryState } from '@/types/category';
import { categoryService } from '@/services/categoryService';

const initialState: CategoryState = {
  categories: [],
  status: 'idle',
  lastFetched: null,
  error: null
};

// Thunk to fetch categories from the API
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data: CategoryResponse = await categoryService.getCategories(); // Replace with your API endpoint
      // Check if the data returned is valid
      if (!data.meta?.success) throw new Error('Failed to fetch categories');
      if (!data.records) throw new Error('There is no recorded data');
      // Dispatch setCategories to update state and save to local storage
      dispatch(setCategories(data.records));

      return data.records; // Return the records if needed
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return []
    }
  }
);

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    addSubcategory: (state, action: PayloadAction<{ parentId: string; category: Category }>) => {
      const { parentId, category } = action.payload;

      const addSubcategoryRecursive = (categories: Category[]): Category[] => {
        return categories.map((cat) => {
          if (cat.id === parentId) {
            return {
              ...cat,
              children: cat.children ? [...cat.children, category] : [category],
            };
          } else if (cat.children) {
            return {
              ...cat,
              children: addSubcategoryRecursive(cat.children),
            };
          }
          return cat;
        });
      };

      state.categories = addSubcategoryRecursive(state.categories);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
    },
});

export const { setCategories, addCategory, addSubcategory } = categorySlice.actions;
export default categorySlice.reducer;
