import api from "./api";

const getAppointments = async (params = {}) => {
  const response = await api.get("/appointments", {
    params,
  });

  return response.data;
};

const getAppointmentById = async (id) => {
  const response = await api.get(`/appointments/${id}`);

  return response.data;
};

const createAppointment = async (appointmentData) => {
  const response = await api.post(
    "/appointments",
    appointmentData
  );

  return response.data;
};

const updateAppointment = async (
  id,
  appointmentData
) => {
  const response = await api.put(
    `/appointments/${id}`,
    appointmentData
  );

  return response.data;
};

const deleteAppointment = async (id) => {
  const response = await api.delete(
    `/appointments/${id}`
  );

  return response.data;
};

export default {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};