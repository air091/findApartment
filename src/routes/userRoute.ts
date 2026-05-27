import { Router } from "express";
import { register } from "../controllers/userController.js";

const router: Router = Router();

router.post("/register", register);

export default router;
