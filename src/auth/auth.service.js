import userRepository from "../user/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { createUser, findUserByEmail } = userRepository;

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
const JWT_SECRET = process.env.JWT_SECRET || "01JXHRAD85FT1QHEEY2FMKFKM2";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

const registerService = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  const user = await createUser({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

const loginService = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    photo: user.photo,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const { password: _, ...safeUser } = user;

  return { token, user: safeUser };
};

const googleLoginService = async (googleUserProfile) => {
  const email = googleUserProfile.email;
  const name = googleUserProfile.name;
  const photo = googleUserProfile.photo;

  let user = await findUserByEmail(email);

  if (!user) {
    user = await createUser({
      name,
      email,
      photo,
      password,
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    photo: user.photo,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const { password: _, ...safeUser } = user;

  return { token, user: safeUser };
};

export default { registerService, loginService, googleLoginService };
