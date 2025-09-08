import { Router } from "express";
import { deleteUrlById, getUrlById, openUrl, shortenUrl } from "../controllers/urls.controllers.js";
import { validateSchema } from "../middlewares/validate.schema.js";
import { urlSchema } from "../schemas/urls.schema.js";
import { authenticate } from "../middlewares/authValidate.meddleware.js";
import { checkShortUrlExist, checkUrlById } from "../middlewares/urls.middlewares.js";


const urlsRouter = Router(); 

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), authenticate, shortenUrl);
urlsRouter.get("/urls/:id", getUrlById);
urlsRouter.get("/urls/open/:shortUrl", checkShortUrlExist, openUrl);
urlsRouter.delete("/urls/:id", authenticate, checkUrlById, deleteUrlById);

export default urlsRouter;