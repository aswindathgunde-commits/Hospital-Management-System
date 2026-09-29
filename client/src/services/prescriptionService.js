import api from "./api";

const getPrescriptions = async (params = {}) => {
  const response = await api.get("/prescriptions", {
    params,
  });

  return response.data;
};

const getPrescriptionById = async (id) => {
  const response = await api.get(
    `/prescriptions/${id}`
  );

  return response.data;
};

const createPrescription = async (prescriptionData) => {
  const response = await api.post(
    "/prescriptions",
    prescriptionData
  );

  return response.data;
};

const updatePrescription = async (
  id,
  prescriptionData
) => {
  const response = await api.put(
    `/prescriptions/${id}`,
    prescriptionData
  );

  return response.data;
};

const deletePrescription = async (id) => {
  const response = await api.delete(
    `/prescriptions/${id}`
  );

  return response.data;
};

export default {
  getPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription,
};