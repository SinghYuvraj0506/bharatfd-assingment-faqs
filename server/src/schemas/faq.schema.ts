import { TRANSLATION_LANGUAGES } from "@prisma/client";
import z from "zod";

export const getFAQSchema = z.object({
  query: z.object({
    lang: z.nativeEnum(TRANSLATION_LANGUAGES).or(z.enum(["en"]).optional()),
  }),
});

export const createFAQSchema = z.object({
  body: z.object({
    question: z
      .string({ required_error: "Question is Required" })
      .max(500, { message: "Question is too long" }),
    answer: z
      .string({ required_error: "Answer is required" })
      .max(5000, { message: "Answer is too long" }),
  }),
});

export const updateFAQSchema = z.object({
  body: z.object({
    question: z
      .string({ required_error: "Question is Required" })
      .max(500, { message: "Question is too long" })
      .optional(),
    answer: z
      .string({ required_error: "Answer is required" })
      .max(5000, { message: "Answer is too long" })
      .optional(),
  }),
});
