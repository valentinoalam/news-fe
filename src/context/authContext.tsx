import { createContext, useContext, useEffect, ReactNode, useDebugValue } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useDispatch, useSelector } from "react-redux";
import { setSession, setLoading } from "@/store/features/authSlice"
import { RootState } from "@/store/store";

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
const AuthProvider: React.FC<AuthProviderProps> = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') {
      dispatch(setLoading(true));
    } else {
      dispatch(setSession(session));
    }
  }, [session, status, dispatch]);

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