import { createContext, useContext, useEffect, useState } from "react";
import { getUser, logout } from "@/lib/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load logged-in user
  useEffect(() => {
    async function loadUser() {
      try {
        const current = await getUser();
        setUser(current as any);
      } catch (e) {
        setUser(null);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
