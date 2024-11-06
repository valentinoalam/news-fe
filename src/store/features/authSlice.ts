// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from 'next-auth';
import { RootState } from '../store';

interface AuthState {
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  session: null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
    },
    clearSession: (state) => {
      state.session = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setSession, clearSession, setLoading } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
export const selectSession = (state: RootState) => state.auth.session;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;