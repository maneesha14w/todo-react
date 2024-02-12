import { useState } from "react"

import "./styles.css"
import Todo from "./Todo"

function App() {
	// new todo text
	const [newTodo, setNewTodo] = useState("")
	// array of todo state
	const [todos, setTodos] = useState<Todo[]>([])

	// STATE Functions
	function onSubmitTodo(e: React.FormEvent<HTMLFormElement>) {
		// Prevents the default form submission behavior of refreshing
		e.preventDefault()
		if (newTodo === "") return alert("Todo cannot be blank")
		// if not blank create new obj and add to todos arr.
		setTodos((todos) => {
			const newTodoObj = new Todo(newTodo, false, crypto.randomUUID())
			return [...todos, newTodoObj]
		})
		// make text field blank for new entry
		setNewTodo("")
	}

	function toggleComplete(id: string, isComplete: boolean): void {
		//change todos to be a mapped version where if the id is equal to toddledId, isComplete is changed.
		// TODO optimise with ! operator?
		setTodos((todos) => {
			return todos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, isComplete }
				}
				return todo
			}) as Todo[]
		})
	}

	function editTodo(id: string, title: string) {
		// showModal()
		// const copyOfTodos = todos.slice()
		//change todos to be a mapped version where if the id is equal to passed id, title is changed.
		setTodos((todos) => {
			return todos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, title }
				}
				return todo
			})
		})
	}

	function deleteTodo(id: string) {
		// const copyOfTodos = todos.slice()
		// filter out todos if id is not equal to passed id
		setTodos((todos) => {
			return todos.filter((todo) => {
				todo.id != id
			})
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
									<p className={todo.isComplete ? "strike" : ""}>
										{todo.title}
									</p>
								</div>
								<div className="buttons">
									<button
										className="btn btn-edit"
										onClick={() => editTodo(todo.id, newTodo)}
									>
										Edit
									</button>
									<button
										onClick={() => deleteTodo(todo.id)}
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
