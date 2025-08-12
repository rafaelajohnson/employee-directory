const express = require("express");
const path = require("path");

const dataPath = path.resolve(__dirname, "db", "employees.json");
const raw = require(dataPath); // require JSON directly

const employees = Array.isArray(raw) ? raw : raw.employees;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello employees"); // match your tests exactly (no "!")
});

// define /employees/random BEFORE /:id
app.get("/employees/random", (_req, res) => {
  const one = employees[Math.floor(Math.random() * employees.length)];
  res.json(one);
});

app.get("/employees", (_req, res) => {
  res.json(employees);
});

app.get("/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = employees.find(e => Number(e.id) === id);
  if (!found) return res.status(404).json({ message: `No employee with id ${id}` });
  res.json(found);
});

module.exports = app;
