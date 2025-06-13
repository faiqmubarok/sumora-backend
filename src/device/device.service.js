import deviceRepository from "./device.repository.js";
import { generateQRCode } from "../utils/qrcode.js";

const { createDevice, updateDevice } = deviceRepository;

const createDeviceService = async () => {
  const device = await createDevice();

  const qrcode = await generateQRCode(device.id);

  const updatedDevice = await updateDevice(device.id, { qrcode });

  return updatedDevice;
};

export default { createDeviceService };
