import api from "./api";

const register = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

const login = async (loginData) => {
  const response = await api.post(
    "/auth/login",
    loginData
  );

  return response.data;
};

const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  getCurrentUser,
  logout,
};