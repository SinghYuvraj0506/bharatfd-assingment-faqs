import { TRANSATION_LANGUAGES } from "@prisma/client";
import z from "zod";

export const getFAQSchema = z.object({
  query: z.object({
    lang: z.nativeEnum(TRANSATION_LANGUAGES).optional(),
  }),
});


export const createFAQSchema = z.object({
  body: z.object({
    question: z
      .string()
      .min(1, { message: "Question is required" })
      .max(500, { message: "Question is too long" }),
    answer: z
      .string()
      .min(1, { message: "Answer is required" })
      .max(5000, { message: "Answer is too long" }),
    language: z.nativeEnum(TRANSATION_LANGUAGES).optional(),
  }),
});



export const updateFAQSchema = z.object({
  body: z.object({
    question: z
      .string()
      .min(1, { message: "Question is required" })
      .max(500, { message: "Question is too long" })
      .optional(),
    answer: z
      .string()
      .min(1, { message: "Answer is required" })
      .max(5000, { message: "Answer is too long" })
      .optional(),
    language: z.nativeEnum(TRANSATION_LANGUAGES).optional(),
  }),
});
