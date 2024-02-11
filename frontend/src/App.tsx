import { useState } from "react"

import "./styles.css"
import Todo from "./Todo"

function App() {
	const [newTodo, setNewtodo] = useState("")
	const [todos, setTodos] = useState<Todo[]>([])

	function onSubmitTodo(e: React.FormEvent<HTMLFormElement>) {
		// Prevents the default form submission behavior of refreshing
		e.preventDefault()
		setTodos((todos) => {
			const newTodoObj = new Todo(newTodo, false, crypto.randomUUID())
			return [...todos, newTodoObj]
		})
	}

	return (
		<>
			<form onSubmit={onSubmitTodo} method="get">
				<div className="form">
					<label htmlFor="newTodo">New Todo:</label>
					<input
						type="text"
						value={newTodo}
						onChange={(e) => setNewtodo(e.target.value)}
						id="newTodo"
						autoComplete="off"
					/>
					<button className="btn" type="submit">
						Add
					</button>
				</div>
			</form>
			<h1>Todo List</h1>
			<ul>
				{todos.map((todo: Todo) => {
					return (
						<li>
							<div className="titleAndStatus">
								<input type="checkbox" name="todo" id="" />
								<p>{todo.title}</p>
							</div>
							<button className="btn btn-danger">Delete</button>
						</li>
					)
				})}
			</ul>
		</>
	)
}

export default App
