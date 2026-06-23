import express from "express";

import { login, logout, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => register(req, res));

router.post("/login", async (req, res) => login(req, res));

router.post("/logout", (req, res) => logout(req, res));

export default router;
