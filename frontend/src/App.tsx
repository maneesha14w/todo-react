import { useState } from "react"

import "./styles.css"
import Todo from "./Todo"

function App() {
	const [newTodo, setNewTodo] = useState("")
	const [todos, setTodos] = useState<Todo[]>([])

	function onSubmitTodo(e: React.FormEvent<HTMLFormElement>) {
		// Prevents the default form submission behavior of refreshing
		e.preventDefault()
		setTodos((todos) => {
			const newTodoObj = new Todo(newTodo, false, crypto.randomUUID())
			return [...todos, newTodoObj]
		})

		setNewTodo("")
	}

	function toggleComplete(id: string, isComplete: boolean): void {
		setTodos((todos) => {
			return todos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, isComplete }
				}
				return todo
			}) as Todo[]
		})
	}

	// function deleteTodo(id: string) {
	// 	setTodos((todos))
	// }

	return (
		<>
			<form onSubmit={onSubmitTodo} method="get">
				<div className="form">
					<label htmlFor="newTodo">New Todo:</label>
					<input
						type="text"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
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
						<div key={todo.id}>
							<li key={todo.id}>
								<div className="titleAndStatus">
									<input
										type="checkbox"
										checked={todo.isComplete}
										name="todo"
										onChange={(e) => toggleComplete(todo.id, e.target.checked)}
									/>
									<p>{todo.title}</p>
								</div>
								<div className="buttons">
									<button className="btn btn-edit">Edit</button>
									<button
										className="btn btn-danger"
										// onClick={deleteTodo(todo.id)}
									>
										Delete
									</button>
								</div>
							</li>
						</div>
					)
				})}
			</ul>
		</>
	)
}

export default App
