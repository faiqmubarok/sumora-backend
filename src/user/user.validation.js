import * as yup from "yup";

import { emailField, nameField, phoneField } from "../schemas/user.schema.js";

export const editUserProfileSchema = yup.object({
  email: emailField,
  name: nameField,
  phone: phoneField,
});
