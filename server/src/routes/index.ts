import {Router} from "express"
import faqRouter from "./faq.routes"

const registerRoutes = () => {
    const router = Router()

    // register all routers ----------
    faqRouter(router)
    

    return router
}


export default registerRoutes;