import api from "./api";

const getBills = async (params = {}) => {
  const response = await api.get("/billing", {
    params,
  });

  return response.data;
};

const getBillById = async (id) => {
  const response = await api.get(`/billing/${id}`);

  return response.data;
};

const createBill = async (billData) => {
  const response = await api.post(
    "/billing",
    billData
  );

  return response.data;
};

const updateBill = async (id, billData) => {
  const response = await api.put(
    `/billing/${id}`,
    billData
  );

  return response.data;
};

const deleteBill = async (id) => {
  const response = await api.delete(
    `/billing/${id}`
  );

  return response.data;
};

export default {
  getBills,
  getBillById,
  createBill,
  updateBill,
  deleteBill,
};