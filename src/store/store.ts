import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './features/authSlice';
import categoryReducer from './features/categorySlice';
import commentsReducer from './features/commentSlice';
import { headlineReducer } from './features/homepageSlice';

// Define persist config for the category reducer
const categoryPersistConfig = {
  key: 'categories',
  storage,
};
const headlinesPersistConfig = {
  key: 'headlineData',      // Key for local storage
  storage,                  // Storage method (localStorage for web)
  whitelist: ['headline', 'topArticlesByCategory'], // Only persist headline and articles
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth'], // Only persist auth
};


// Wrap each reducer with persistReducer
const persistedCategoryReducer = persistReducer(categoryPersistConfig, categoryReducer);
const persistedHeadlineReducer = persistReducer(headlinesPersistConfig, headlineReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
// Create the store with persisted reducers
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    category: persistedCategoryReducer, // Persisted category reducer
    comments: commentsReducer,          // Non-persisted comments reducer
    headlineData: persistedHeadlineReducer, // Use the persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },//: false, // Disable serializable check if needed
    }),
});

const persistor = persistStore(store);

export { store, persistor };

// Define RootState and AppDispatch types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for use in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// To use with your store:
// export const selectAuth = (state: RootState) => state.auth;
// export const selectSession = (state: RootState) => state.auth.session;
// export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;