import * as yup from "yup";

export const emailField = yup
  .string()
  .required("Email is required")
  .email("Invalid email format");

export const passwordField = yup
  .string()
  .required("Password is required")
  .min(6, "Password must be at least 6 characters");
