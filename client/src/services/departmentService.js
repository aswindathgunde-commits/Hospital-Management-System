import api from "./api";

const getDepartments = async (params = {}) => {
  const response = await api.get("/departments", {
    params,
  });

  return response.data;
};

const getDepartmentById = async (id) => {
  const response = await api.get(
    `/departments/${id}`
  );

  return response.data;
};

const createDepartment = async (departmentData) => {
  const response = await api.post(
    "/departments",
    departmentData
  );

  return response.data;
};

const updateDepartment = async (
  id,
  departmentData
) => {
  const response = await api.put(
    `/departments/${id}`,
    departmentData
  );

  return response.data;
};

const deleteDepartment = async (id) => {
  const response = await api.delete(
    `/departments/${id}`
  );

  return response.data;
};

export default {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};