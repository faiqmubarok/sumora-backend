import deviceRepository from "./device.repository.js";
import { generateQRCode } from "../utils/qrcode.js";
import userRepository from "../user/user.repository.js";

const { createDevice, updateDevice, getDeviceById } = deviceRepository;
const { findUserById } = userRepository;

const createDeviceService = async () => {
  const device = await createDevice();

  const qrcode = await generateQRCode(device.id);

  const updatedDevice = await updateDevice(device.id, { qrcode });

  return updatedDevice;
};

const connectDeviceService = async (userId, deviceId) => {
  const device = await getDeviceById(deviceId);
  if (!device) throw new Error("Device not found");

  const user = await findUserById(userId);
  if (!user) throw new Error("User not found");

  if (device.userId) {
    throw new Error("Device is already connected to a user");
  }

  const updatedDevice = await updateDevice(deviceId, { userId });
  return updatedDevice;
};

export default { createDeviceService, connectDeviceService };
