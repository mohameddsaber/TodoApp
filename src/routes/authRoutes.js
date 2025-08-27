// routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
const SECRET = "supersecretkey";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ error: "Missing fields" });

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function (err) {
    if (err) return res.status(400).json({ error: "User already exists" });
    const token = jwt.sign({ id: this.lastID, username }, SECRET, { expiresIn: "1m" });
    res.json({ token });
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err || !user) return res.status(400).json({ error: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: "1m" });
    res.json({ token });
  });
});

export default router;
