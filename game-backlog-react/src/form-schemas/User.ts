import { object, string, InferType } from "yup";

export const UserCredentialsSchema = object({
  email: string().email().required("Email is required"),
  password: string().required("Password is required"),
});

export type UserCredentials = InferType<typeof UserCredentialsSchema>;

export const UserSchema = UserCredentialsSchema.shape({
  name: string().required("Name is required"),
});

export type User = InferType<typeof UserSchema>;