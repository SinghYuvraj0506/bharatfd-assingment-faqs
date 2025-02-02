import { Router } from "express";
import { createFaqs } from "../controllers/faq.controller";
import validate from "../middlewares/validate.middleware";
import { createFAQSchema } from "../schemas/faq.schema";

const faqRouter = (router: Router) => {
  router.post("/faq", validate(createFAQSchema), createFaqs);
};

export default faqRouter;
