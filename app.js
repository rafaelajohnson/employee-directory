// app.js
const express = require("express");
const path = require("path");

const app = express();

// Load the JSON array
const dataPath = path.resolve(__dirname, "db", "employees.json");
const employees = require(dataPath);
if (!Array.isArray(employees)) {
  throw new Error("db/employees.json must export an array");
}

// GET /  -> exact string expected by tests
app.get("/", (_req, res) => {
  res.send("Hello employees");
});

// Define /employees/random BEFORE /employees/:id
app.get("/employees/random", (_req, res) => {
  const idx = Math.floor(Math.random() * employees.length);
  res.json(employees[idx]);
});

// All employees
app.get("/employees", (_req, res) => {
  res.json(employees);
});

// Employee by id
app.get("/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = employees.find((e) => Number(e.id) === id);
  if (!found) return res.status(404).json({ message: `No employee with id ${id}` });
  res.json(found);
});

module.exports = app;
