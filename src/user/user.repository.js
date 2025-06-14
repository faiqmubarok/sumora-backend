import prisma from "../config/prisma.js";

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      photo: true,
      password: true,
      devices: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      photo: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
      devices: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const createUser = async (user) => {
  return await prisma.user.create({
    data: user,
  });
};

const updateUserById = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      photo: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
      devices: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export default {
  findUserById,
  findUserByEmail,
  createUser,
  updateUserById,
};
