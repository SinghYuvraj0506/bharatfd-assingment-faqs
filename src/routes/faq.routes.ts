import { Router } from "express";
import { getAllFaqs } from "../controllers/faq.controller";

const faqRouter = (router: Router) => {
  router.get("/getfaqs", getAllFaqs);

};


export default faqRouter