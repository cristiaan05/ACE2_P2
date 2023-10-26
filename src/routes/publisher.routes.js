import { Router } from "express";
import { leerSensores, publishA, publishB } from "../controllers/pub.js";
const routerPub = Router();

routerPub.get('/pub', publishB);
routerPub.get('/pubA', publishA);
routerPub.post('/actual', leerSensores);
export default routerPub;