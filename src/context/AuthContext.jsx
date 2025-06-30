import { createContext, useContext, useEffect, useState } from "react";
import { Login, Logout } from "../service/api.services";
import { Loading } from "../components/Loading";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (form) => {
    const response = await Login(form);
    if (response.status === 200) {
      sessionStorage.setItem("token", response.data.accessToken);
      sessionStorage.setItem("role", response.data.role);
      setUser(response.data);
    }
    return response;
  };

  const logout = async () => {
    await Logout();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setUser(null);
  };

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
