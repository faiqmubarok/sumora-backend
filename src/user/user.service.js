import userRepository from "./user.repository.js";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "../utils/cloudinary.js";

const { findUserById, updateUserById, findUserByEmail } = userRepository;

const getUserByIdService = async (id) => {
  const user = await findUserById(id);

  if (!user) throw new Error("User not found");

  return user;
};

const updateUserByIdService = async (userId, data, file) => {
  const existingUser = await findUserById(userId);
  if (!existingUser) throw new Error("User not found");

  let photo = undefined;

  if (data.email) {
    const existEmail = await findUserByEmail(data.email);

    if (existEmail) {
      throw new Error("Email is already registered");
    }
  }

  if (file) {
    try {
      const existingImageUrl = existingUser.photo;

      if (existingImageUrl) {
        await deleteImageFromCloudinary(existingImageUrl.publicId);
      }

      const uploadResult = await uploadImageToCloudinary(file.buffer);
      photo = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error(
        "Image upload failed: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  }

  const updatedData = {
    ...data,
  };

  if (photo) {
    updatedData.photo = photo;
  }

  const updated = await updateUserById(userId, updatedData);

  return updated;
};

export default { getUserByIdService, updateUserByIdService };
