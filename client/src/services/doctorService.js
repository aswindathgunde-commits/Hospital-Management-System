import api from "./api";

const getDoctors = async (params = {}) => {
  const response = await api.get("/doctors", {
    params,
  });

  return response.data;
};

const getDoctorById = async (id) => {
  const response = await api.get(`/doctors/${id}`);

  return response.data;
};

const createDoctor = async (doctorData) => {
  const response = await api.post("/doctors", doctorData);

  return response.data;
};

const updateDoctor = async (id, doctorData) => {
  const response = await api.put(
    `/doctors/${id}`,
    doctorData
  );

  return response.data;
};

const deleteDoctor = async (id) => {
  const response = await api.delete(`/doctors/${id}`);

  return response.data;
};

export default {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};