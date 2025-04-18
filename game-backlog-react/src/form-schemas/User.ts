import { object, string, InferType } from "yup";

export const UserCredentialsSchema = object({
  email: string().email().required("Email is required"),
  password: string().required("Password is required"),
});

export type UserCredentials = InferType<typeof UserCredentialsSchema>;

export const UserSchema = UserCredentialsSchema.shape({
  first_name: string().required("First name is required"),
  last_name: string().required("Last name is required"),
});

export type User = InferType<typeof UserSchema>;