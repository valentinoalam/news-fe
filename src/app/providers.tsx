import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '@/store/store';
import { ThemeProvider } from '@/components/theme-provider';
// import { AuthProvider } from '@/context/AuthContext';

/** 
 * Define the Providers component that wraps children
 * with all required providers,
 * in this example is AuthProvider and ThemeProvider
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <AuthProvider> */}
          <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
            {children}
          </ThemeProvider>
        {/* </AuthProvider> */}
      </PersistGate>
    </ReduxProvider>
  );
}
