import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import categoryReducer from './features/categorySlice';
import commentsReducer from './features/commentSlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    comments: commentsReducer,
  },
});
const persistor = persistStore(store);

export { store, persistor };

// Define RootState and AppDispatch types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for use in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
