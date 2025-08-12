// app.js
const express = require("express");
const path = require("path");

const app = express();

// Load the seed data from db/employees.json
const dataPath = path.resolve(__dirname, "db", "employees.json");
const employees = require(dataPath); // must be a JSON array

// GET / -> "Hello employees"
app.get("/", (req, res) => {
  res.send("Hello employees");
});


// GET /employees/random -> one random employee
app.get("/employees/random", (req, res) => {
  const idx = Math.floor(Math.random() * employees.length);
  res.json(employees[idx]);
});

// GET /employees -> the array of employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

// GET /employees/:id -> employee with that id, or 404
app.get("/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = employees.find((e) => Number(e.id) === id);

  if (!found) {
    return res.status(404).json({ message: `No employee with id ${id}` });
  }
  res.json(found);
});

module.exports = app;
