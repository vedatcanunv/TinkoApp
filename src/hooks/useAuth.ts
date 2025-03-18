import { createContext, useContext } from "react";

// Auth Context tipi
export type AuthContextType = {
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  userToken: string | null;
};

// Auth Context oluşturma
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Auth Context Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
