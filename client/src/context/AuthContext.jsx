import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check logged-in user when application starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response =
          await authService.getCurrentUser();

        const currentUser =
          response.user ||
          response.data ||
          response;

        setUser(currentUser);

        localStorage.setItem(
          "user",
          JSON.stringify(currentUser)
        );
      } catch (error) {
        console.error(
          "Failed to load user:",
          error
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login
  const login = async (loginData) => {
    const response =
      await authService.login(loginData);

    const token = response.token;

    const loggedInUser =
      response.user ||
      response.data?.user;

    if (token) {
      localStorage.setItem(
        "token",
        token
      );
    }

    if (loggedInUser) {
      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      setUser(loggedInUser);
    }

    return response;
  };

  // Register
  const register = async (registerData) => {
    const response =
      await authService.register(
        registerData
      );

    return response;
  };

  // Logout
  const logout = () => {
    authService.logout();

    setUser(null);
  };

  // Check authentication
  const isAuthenticated =
    Boolean(
      localStorage.getItem("token")
    );

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

export default AuthContext;