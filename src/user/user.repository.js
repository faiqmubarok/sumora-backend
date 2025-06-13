import prisma from "../config/prisma.js";

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      photo: true,
      phone: true,
      deviceId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const createUser = async (user) => {
  return await prisma.user.create({
    data: user,
  });
};

export default {
  findUserById,
  findUserByEmail,
  createUser,
};
