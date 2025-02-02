import { Request, Response } from "express";
import prisma from "../config/db.config";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";

export const getAllFaqs = asyncHandler(async (req: Request, res: Response) => {
  const faqs = await prisma.fAQ.findMany();

  res.json(new ApiResponse(200, faqs, "FAQS fetched Successfully"));
});
