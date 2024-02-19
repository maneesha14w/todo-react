// requirements
import { Request, Response } from "express";
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool_module = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

// create todo
app.post("/todos", async (req: Request, res: Response) => {
  try {
    const { todo_title } = req.body;
    const newTodo = await pool_module.query(
      "INSERT INTO todo (todo_title) VALUES ($1) RETURNING *",
      [todo_title]
    );
    res.json(newTodo);
  } catch (error) {
    console.error(error.message);
  }
});

// get all todos

// get todo

// update todo

// delete todo

// start server
app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
