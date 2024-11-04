import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/authContext';
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <SessionProvider  refetchInterval={0} refetchOnWindowFocus={false}>
          <AuthProvider> */}
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
              {children}
            </ThemeProvider>
          {/* </AuthProvider>
        </SessionProvider> */}
      </PersistGate>
    </ReduxProvider>
  );
}
