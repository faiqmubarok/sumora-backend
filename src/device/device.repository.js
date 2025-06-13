import prisma from "../config/prisma.js";

const createDevice = async () => {
  return prisma.device.create({ data: {} });
};

const getDeviceById = async (id) => {
  return prisma.device.findUnique({
    where: { id },
  });
};

const updateDevice = async (id, data) => {
  return prisma.device.update({
    where: { id },
    data,
  });
};

export default {
  getDeviceById,
  createDevice,
  updateDevice,
};
