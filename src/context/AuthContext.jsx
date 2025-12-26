import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("auth");
      return raw ? JSON.parse(raw) : { token: null, role: null };
    } catch (e) {
      return { token: null, role: null };
    }
  });

  // persist auth to localStorage
  useEffect(() => {
    if (user && user.token) {
      localStorage.setItem("auth", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth");
    }
  }, [user]);

  // login accepts a payload object and merges it into the current user
  const login = (payload) => {
    if (!payload || typeof payload !== "object") return;
    setUser((prev) => ({ ...(prev || {}), ...payload }));
  };

  const logout = () => {
    setUser({ token: null, role: null });
    localStorage.removeItem("auth");
  };

  const isAuthenticated = !!(user && user.token);

  // If we have a token but no name/email, try to fetch the current user's profile
  useEffect(() => {
    const populateFromTokenOrProfile = async () => {
      if (!user || !user.token) return;
      // if we already have name/email, nothing to do
      if (user.name || user.fullName || user.email) return;

      // 1) Try decode JWT token payload (many backends include name/email there)
      try {
        const parts = user.token.split('.');
        if (parts.length === 3) {
          const payload = parts[1];
          // base64url -> base64
          const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
          const jsonStr = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          const obj = JSON.parse(jsonStr);
          const nameFromToken = obj.fullName || obj.name || obj.full_name;
          const emailFromToken = obj.email || obj.email_address;
          if (nameFromToken || emailFromToken) {
            setUser((prev) => ({ ...(prev || {}), ...(nameFromToken ? { name: nameFromToken } : {}), ...(emailFromToken ? { email: emailFromToken } : {}) }));
            return;
          }
        }
      } catch (err) {
        // ignore token decode errors
        console.error('token decode failed', err);
      }

      // 2) Fallback: try fetching profile endpoint (if available)
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        const u = data.user || data.data || data;
        const name = (u && (u.fullName || u.name || u.full_name)) || undefined;
        const email = (u && (u.email || u.email_address)) || undefined;
        if (name || email) {
          setUser((prev) => ({ ...(prev || {}), ...(name ? { name } : {}), ...(email ? { email } : {}) }));
        }
      } catch (err) {
        console.error("profile fetch failed", err);
      }
    };

    populateFromTokenOrProfile();
  }, [user, API_BASE]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
