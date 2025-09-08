import { Router } from "express";
import { getRanking } from "../controllers/rankings.controllers.js";


const rankingsRouter = Router();

rankingsRouter.get("/ranking", getRanking);

export default rankingsRouter;