import api from "./api";

// ======================================================
// GET DASHBOARD DATA
// ======================================================

const getDashboardStats = async () => {
  const response = await api.get(
    "/dashboard/stats"
  );

  return response.data;
};

export default {
  getDashboardStats,
};