import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("auth");
      return raw ? JSON.parse(raw) : { token: null, role: null };
    } catch (e) {
      return { token: null, role: null };
    }
  });

  useEffect(() => {
    if (user && user.token) {
      localStorage.setItem("auth", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth");
    }
  }, [user]);

  const login = ({ token, role }) => {
    setUser({ token, role });
  };

  const logout = () => {
    setUser({ token: null, role: null });
    localStorage.removeItem("auth");
  };

  const isAuthenticated = !!(user && user.token);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
