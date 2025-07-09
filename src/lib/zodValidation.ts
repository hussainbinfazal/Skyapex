import { z } from "zod";

type FormData = {
  fullName: string;
  fatherName: string;
  propertySize: string;
  saleAmount: number;
  date?: string;
  [key: string | number]: string | undefined | number;
};
type Errors = {
  [key: string]: string | null;
};

export const deedSchema: z.ZodType<FormData> = z.object({
  fullName: z.string().min(1, "Full name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  propertySize: z
    .string()
    .min(1, "Property size is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Property size must be a valid number",
    }),
  saleAmount: z
    .coerce.number()
    .min(1, "Sale amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Sale amount must be a valid number",
    }),
  date: z
    .string()
    .min(1, "Date is required")
    .refine(
      (val) => {
        const selected = new Date(val);
        const today = new Date();
        return selected <= today;
      },
      { message: "Date cannot be in the future" }
    ),
});
