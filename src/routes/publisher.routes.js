import { Router } from "express";
import { publishB } from "../controllers/pub";
const routerPub=Router();

routerPub.get('/pub',publishB);
export default routerPub;