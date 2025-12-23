import { createContext, useContext, ReactNode } from "react";
import { useVerifyToken } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ReadUserDto } from "@/types/users.dto";

interface AuthContextType {
  user: ReadUserDto | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { data: userFromQuery, isLoading } = useVerifyToken();
  const accessToken = Cookies.get("accessToken");

  const userFromCache = queryClient.getQueryData<ReadUserDto>(["auth", "user"]);
  const user = userFromQuery || userFromCache;

  const isAuthenticated = Boolean(accessToken && user);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
