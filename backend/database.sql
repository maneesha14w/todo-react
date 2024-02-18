CREATE DATABASE todo;

CREATE TABLE Todo(
    todo_id SERIAL PRIMARY KEY,
    todo_title VARCHAR(255),
    is_complete BOOLEAN NOT NULL
);