import { createContext, useContext, useEffect, useState, ReactNode, useDebugValue } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

// Define the context's shape
interface AuthContextProps {
  session: Session | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

// Create the AuthContext with a default value of null
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component to wrap the application
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  const login = () => signIn();
  const logout = () => signOut();

  return (
    <AuthContext.Provider value={{ session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { session }= context;
  useDebugValue(session, (session: Session | null) => session?.user ? "Logged In" : "Logged Out")
  return context;
};

export { AuthProvider, useAuth };