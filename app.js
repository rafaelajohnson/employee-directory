const express = require("express");
const path = require("path");

//load employee data
const raw = require(path.join(__dirname, "db", "employees.json"));
const employees = Array.isArray(raw) ? raw : raw.employees;

const app = express();

// GET - Hello employees
app.get("/", (req, res) => {
  res.send("Hello Employees!");
});


// GET - employee array
app.get("/employees", (req, res) => {
  res.json(employees);
});

app.get("/employees/random", (req, res) => {
    const random = employees[Math.floor(Math.random() * employees.length)];
    res.json(random);
  });
  
  /** GET /employees/:id -> employee with that id, or 404 with a message */
  app.get("/employees/:id", (req, res) => {
    const id = Number(req.params.id);
    const employee = employees.find((e) => Number(e.id) === id);
  
    if (!employee) {
      return res.status(404).json({ message: `No employee with id ${id}` });
    }
    res.json(employee);
  });
  
  module.exports = app;