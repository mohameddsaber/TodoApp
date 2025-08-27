import express from "express";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
const SECRET = "supersecretkey";

function authenticate(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
}

// Get all todos
router.get("/", authenticate, (req, res) => {
  db.all("SELECT * FROM todos WHERE user_id = ?", [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add todo
router.post("/", authenticate, (req, res) => {
  const { task } = req.body;
  db.run("INSERT INTO todos (user_id, task) VALUES (?, ?)", [req.user.id, task], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, task, completed: 0 });
  });
});

// Update todo
router.put("/:id", authenticate, (req, res) => {
  const { task, completed } = req.body;
  db.run("UPDATE todos SET task = ?, completed = ? WHERE id = ? AND user_id = ?", 
    [task, completed, req.params.id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// Delete todo
router.delete("/:id", authenticate, (req, res) => {
  db.run("DELETE FROM todos WHERE id = ? AND user_id = ?", [req.params.id, req.user.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

export default router;
