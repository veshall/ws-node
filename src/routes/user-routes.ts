import express, { Router } from "express";
import UserController from "../controllers/user-controller";

const router: Router = express.Router();

router.post("/register", UserController.register);

export default router;
