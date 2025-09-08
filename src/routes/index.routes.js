import { Router } from "express";
import usersRouter from "./users.routes.js";
import urlsRouter from "./urls.routes.js";
import rankingsRouter from "./rankings.routes.js";

const router = Router();
router.use(usersRouter);
router.use(urlsRouter);
router.use(rankingsRouter);

export default router;