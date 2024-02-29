// requirements
import { Request, Response } from "express"; // types for our req and res
import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
//middleware
app.use(cors());
app.use(express.json());

//ROUTES

// create todo
app.post("/todos", async (req: Request, res: Response) => {
  try {
    const { todo_title } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (todo_title) VALUES ($1) RETURNING *",
      [todo_title]
    );
    //returns the data that was added
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get all todos
app.get("/allTodos", async (req: Request, res: Response) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get todo
app.get("/getTodo/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// update todo title
app.put("/editTodo/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { todo_title } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET todo_title = $1 WHERE todo_id = $2",
      [todo_title, id]
    );
    res.json(`Todo id ${id} was updated`);
  } catch (error) {
    console.error(error.message);
  }
});

// toggle isComplete
app.put("/toggleIsComplete/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateTodo = await pool.query(
      "UPDATE todo SET is_complete = NOT is_complete WHERE todo_id = $1",
      [id]
    );
    res.json(`Todo id ${id} was complete status was changed`);
  } catch (error) {
    console.error(error.message);
  }
});

// delete todo
app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(`Todo id ${id} was deleted`);
  } catch (error) {
    console.error(error.message);
  }
});

// start server
app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
