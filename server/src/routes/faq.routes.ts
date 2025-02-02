import { Router } from "express";
import { createFaqs, deleteFaqs, getFaqs, getFaqsById } from "../controllers/faq.controller";
import validate from "../middlewares/validate.middleware";
import { createFAQSchema, getFAQSchema } from "../schemas/faq.schema";

const faqRouter = (router: Router) => {
  router.get("/faq", validate(getFAQSchema), getFaqs);
  router.get("/faq/:id", getFaqsById);
  router.post("/faq", validate(createFAQSchema), createFaqs);
  router.delete("/faq/:id", deleteFaqs);
};

export default faqRouter;
