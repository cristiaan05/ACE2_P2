import { Router } from "express";
import { publishA, publishB } from "../controllers/pub.js";
const routerPub=Router();

routerPub.get('/pub',publishB);
routerPub.get('/pubA',publishA);
export default routerPub;