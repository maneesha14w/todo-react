-- commands used to create DATABASE

CREATE DATABASE todo;

CREATE TABLE Todo(
    --auto increment primary key
    todo_id SERIAL PRIMARY KEY,
    todo_title VARCHAR(255),
    is_complete BOOLEAN NOT NULL
);