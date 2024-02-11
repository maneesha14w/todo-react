import { useState } from "react"
import "./styles.css"

function App() {
	const [newTodo, setNewtodo] = useState("")
	const [todo, setTodo] = useState("")

	function onSubmitTodo(e: React.FormEvent<HTMLFormElement>) {
		// Prevents the default form submission behavior of refreshing
		e.preventDefault()
		console.log(newTodo)
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
				<li>
					<div className="titleAndStatus">
						<input type="checkbox" name="todo" id="" />
						<p>Todo</p>
					</div>
					<button className="btn btn-danger">Delete</button>
				</li>
			</ul>
		</>
	)
}

export default App
