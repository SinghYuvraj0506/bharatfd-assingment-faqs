import { Router } from "express";
import { createFaqs, getFaqs } from "../controllers/faq.controller";
import validate from "../middlewares/validate.middleware";
import { createFAQSchema, getFAQSchema } from "../schemas/faq.schema";

const faqRouter = (router: Router) => {
  router.get("/faq", validate(getFAQSchema), getFaqs);
  router.post("/faq", validate(createFAQSchema), createFaqs);
};

export default faqRouter;
