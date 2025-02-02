import { Request, Response } from "express";
import prisma from "../config/db.config";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import z from "zod";
import { createFAQSchema } from "../schemas/faq.schema";
import { TRANSLATION_LANGUAGES } from "@prisma/client";
import { translateText } from "../utils/translate";

export const createFaqs = asyncHandler(async (req: Request, res: Response) => {
  const {
    body: { question, answer },
  }: z.infer<typeof createFAQSchema> = req;

  const translationLanguages = Object.keys(TRANSLATION_LANGUAGES);

  const promises = translationLanguages.map(async (e) => {
    const questionText = await translateText(question, e);
    const answerText = await translateText(answer, e);

    return {
      language: TRANSLATION_LANGUAGES[e],
      question: questionText,
      answer: answerText,
    };
  });

  const translations = await Promise.all(promises);

  const faq = await prisma.fAQ.create({
    data: {
      question,
      answer,
      translations: {
        createMany: {
          data: translations,
        },
      },
    },
  });

  res.json(new ApiResponse(200, faq, "FAQS Created Successfully"));
});

