import userRepository from "./user.repository.js";

const { findUserById } = userRepository;

const getUserByIdService = async (id) => {
  const user = await findUserById(id);

  if (!user) throw new Error("User not found");

  return user;
};

export default { getUserByIdService };
