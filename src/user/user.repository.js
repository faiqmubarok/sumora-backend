import prisma from "../config/prisma.js";

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const createUser = async (user) => {
  return await prisma.user.create({
    data: user,
  });
};

export default {
  findUserByEmail,
  createUser,
};
