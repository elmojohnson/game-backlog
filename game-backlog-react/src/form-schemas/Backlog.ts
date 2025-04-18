import { object, string } from "yup";

export const BacklogSchema = object({
  name: string().required("Name is required"),
  description: string().optional()
});
