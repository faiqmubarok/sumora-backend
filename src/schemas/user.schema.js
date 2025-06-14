import * as yup from "yup";

export const emailField = yup.string().email("Email tidak valid");

export const nameField = yup.string().min(2, "Nama minimal 2 karakter");

export const phoneField = yup
  .string()
  .matches(/^[0-9+\-() ]*$/, "Nomor telepon tidak valid")
  .min(10, "Nomor telepon terlalu pendek")
  .max(15, "Nomor telepon terlalu panjang");

export const photo = yup
  .mixed()
  .test("fileType", "Tipe file tidak didukung", (value) => {
    if (!value) return true; // optional
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    return allowedTypes.includes(value.mimetype);
  })
  .test("fileSize", "Ukuran file maksimal 2MB", (value) => {
    if (!value) return true; // optional
    const maxSize = 2 * 1024 * 1024; // 2MB
    return value.size <= maxSize;
  });
