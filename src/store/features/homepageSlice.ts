import api from '@/lib/api';
import { Article } from '@/types/article';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHeadlines = createAsyncThunk(
  'headlineData/fetchHeadlines',
  async (_, { rejectWithValue, dispatch }) => {
    try{
      const response = await api.get('/article/headlines'); // Assuming this endpoint exists
      if (!response.headers['content-type'] || !response.headers['content-type'].includes('application/json')) {
        throw new Error('Failed to fetch headlines: expected JSON response');
      }
      // Check if the data returned is valid
      if (response.status >= 400 && response.status < 600) {
        throw new Error('Failed to fetch headlines data');
      }

      if (!response.data) throw new Error('There is no recorded data');
      dispatch(setHeadlineData(response.data));

      return response.data; // Return the records if needed
    } catch (error: unknown) {
      if (error instanceof Error) {
          return rejectWithValue(error.message);
      }
      return []
    }
  }
);

export interface HeadlineState {
    headline: Article | null;
    topArticlesByCategory: Article[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: HeadlineState = {
    headline: null,
    topArticlesByCategory: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
}

const headlineSlice = createSlice({
  name: 'headlineData',
  initialState,
  reducers: {
    setHeadlineData: (state, action) => {
      state.headline = action.payload.headline;
      state.topArticlesByCategory = action.payload.topArticlesByCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeadlines.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHeadlines.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.headline = action.payload.headline;
        state.topArticlesByCategory = action.payload.topArticlesByCategory;
      })
      .addCase(fetchHeadlines.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

export const { setHeadlineData } = headlineSlice.actions;
export const headlineReducer = headlineSlice.reducer;
