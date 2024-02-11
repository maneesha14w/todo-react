import { useState } from "react"
import "./styles.css"

function App() {
	function onSubmitTodo(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
	}
	return (
		<>
			<form onSubmit={onSubmitTodo} method="get">
				<div className="form">
					<label htmlFor="newTodo">New Todo:</label>
					<input type="text" id="newTodo" />
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
