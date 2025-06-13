import QRCode from "qrcode";

export const generateQRCode = async (text) => {
  return QRCode.toDataURL(text);
};
