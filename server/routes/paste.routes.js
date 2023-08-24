import { Router } from "express";
import { getGlobalVisitors, getPaste, getRawPaste, createPaste } from "../controllers/paste.controllers.js";

const router = Router();

router.get("/api/visitors", getGlobalVisitors);

router.get("/api/paste/:id", getPaste);

router.get("/api/paste/raw/:id", getRawPaste);

router.post("/api/create", createPaste);

export default router;