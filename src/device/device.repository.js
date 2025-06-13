import prisma from "../config/prisma.js";

const createDevice = async () => {
  return prisma.device.create({ data: {} });
};

const updateDevice = async (id, data) => {
  return prisma.device.update({
    where: { id },
    data,
  });
};

export default {
  createDevice,
  updateDevice,
};
