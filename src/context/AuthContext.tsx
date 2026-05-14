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
      // tRPC expects input as a properly URL-encoded query parameter
      const input = { username, password };
      const inputParam = encodeURIComponent(JSON.stringify(input));
      
      const response = await fetch(
        `https://registro-kilometros-app.onrender.com/api/trpc/auth.login?input=${inputParam}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Login response error:', response.status, errorText);
        throw new Error(`Login failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Login response:', data);
      
      // tRPC wraps the result in a specific structure
      const result = data.result?.data || data.result;

      if (result?.token && result?.user) {
        setToken(result.token);
        setUser(result.user);
        localStorage.setItem('supervisorToken', result.token);
        localStorage.setItem('supervisorUser', JSON.stringify(result.user));
      } else {
        throw new Error('Invalid login response structure');
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
