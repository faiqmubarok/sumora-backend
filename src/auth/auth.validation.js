import * as yup from "yup";
import { emailField, passwordField } from "../schemas/auth.schema.js";

export const registerSchema = yup.object().shape({
  email: emailField,
  password: passwordField,
});

export const loginSchema = yup.object().shape({
  email: emailField,
  password: yup.string().required("Password is required"),
});
