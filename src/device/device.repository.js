import prisma from "../config/prisma.js";

const createDevice = async (name) => {
  return prisma.device.create({ data: { name } });
};

const getDeviceByName = async (name) => {
  return prisma.device.findUnique({
    where: { name },
  });
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
  getDeviceByName,
  getDeviceById,
  createDevice,
  updateDevice,
};
