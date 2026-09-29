import api from "./api";

const getPatients = async () => {
  const response = await api.get("/patients");
  return response.data;
};

const getPatientById = async (id) => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

const createPatient = async (patientData) => {
  const response = await api.post(
    "/patients",
    patientData
  );

  return response.data;
};

const updatePatient = async (id, patientData) => {
  const response = await api.put(
    `/patients/${id}`,
    patientData
  );

  return response.data;
};

const deletePatient = async (id) => {
  const response = await api.delete(
    `/patients/${id}`
  );

  return response.data;
};

export default {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};