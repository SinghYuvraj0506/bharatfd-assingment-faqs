import { Request, Response } from "express";
import prisma from "../config/db.config";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import z from "zod";
import { createFAQSchema, getFAQSchema } from "../schemas/faq.schema";
import { TRANSLATION_LANGUAGES } from "@prisma/client";
import { translateText } from "../utils/translate";
import redisClient from "../config/redis.config";
import log from "../utils/logger";

export const getFaqs = asyncHandler(async (req: Request, res: Response) => {
  const {
    query: { lang },
  }: z.infer<typeof getFAQSchema> = req;
  let faqs: any;

  const cacheKey = "faq:" + (lang ?? "en");
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    faqs = JSON.parse(cachedData);
    log.info("Cache data hit");
  } else {
    if (!lang || lang === "en") {
      faqs = await prisma.fAQ.findMany({
        select: {
          question: true,
          answer: true,
        },
      });
    } else {
      faqs = await prisma.fAQTranslation.findMany({
        where: {
          language: lang as any,
        },
        select: {
          question: true,
          answer: true,
        },
      });
    }

    await redisClient.set(cacheKey, JSON.stringify(faqs), "EX", 300);
    log.info("Cache miss");
  }

  res.json(new ApiResponse(200, faqs, "FAQS Fetched Successfully"));
});

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
