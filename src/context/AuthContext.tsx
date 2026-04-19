import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  user: any | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar token del localStorage al iniciar
  useEffect(() => {
    const savedToken = localStorage.getItem('supervisorToken');
    const savedUser = localStorage.getItem('supervisorUser');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('https://3000-iol4fk8egqty4vkcqygvg-3f540a54.us2.manus.computer/api/trpc/auth.login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Login failed');
      
      const data = await response.json();
      const result = data.result?.data;

      if (result?.token && result?.user) {
        setToken(result.token);
        setUser(result.user);
        localStorage.setItem('supervisorToken', result.token);
        localStorage.setItem('supervisorUser', JSON.stringify(result.user));
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('supervisorToken');
    localStorage.removeItem('supervisorUser');
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
