
import { Customer } from '@/types';
import { createContext, useContext } from 'react';
import { useProfile } from './useAuth';

interface AuthContextValue {
  user: Customer | null;
  isLoading: boolean;
}


const AuthContext = createContext<AuthContextValue>({ user: null, isLoading: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useProfile();

  return (
    <AuthContext.Provider value={{ user: data, isLoading } as AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
