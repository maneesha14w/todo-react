import { useState } from "react"
import Todo from "./Todo"
import Form from "./components/Form"

export function App() {
	// array of todo state
	const [todos, setTodos] = useState<Todo[]>([])
	// editMode State
	const [editMode, setEditMode] = useState(false)
	//editing todo
	const [editId, setEditId] = useState("")

	// STATE Functions
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
		setEditId(id)
		if (editMode && title === "") return alert("Todo cannot be blank")
		setEditMode(!editMode)
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
		// setNewTodo("")
	}

	function saveTodo(title: string) {
		setTodos((todos) => {
			const newTodoObj = new Todo(title, false, crypto.randomUUID())
			return [...todos, newTodoObj]
		})
	}

	function deleteTodo(id: string) {
		// const copyOfTodos = todos.slice()
		// filter out todos if id is not equal to passed id
		setTodos((todos) => {
			return todos.filter((todo) => todo.id != id)
		})
	}

	return (
		<>
			<Form editMode={editMode} saveTodo={saveTodo}></Form>
			<ul>
				{todos.length > 0 ? (
					todos.map((todo: Todo) => {
						return (
							<div key={todo.id}>
								<li
									className={
										editMode && editId != todo.id ? " li disabled" : "  li"
									}
									key={todo.id}
								>
									<div className="titleAndStatus">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" fill="none" />
											<path d="M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
											<path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
											<path d="M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
											<path d="M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
											<path d="M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
											<path d="M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
										</svg>
										<input
											type="checkbox"
											checked={todo.isComplete}
											name="todo"
											onChange={(e) =>
												toggleComplete(todo.id, e.target.checked)
											}
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
											{editMode && editId === todo.id ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													fill="none"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path stroke="none" d="M0 0h24v24H0z" fill="none" />
													<path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
													<path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
													<path d="M14 4l0 4l-6 0l0 -4" />
												</svg>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													fill="none"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path stroke="none" d="M0 0h24v24H0z" fill="none" />
													<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
													<path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
													<path d="M16 5l3 3" />
												</svg>
											)}
										</button>
										<button
											disabled={editMode}
											onClick={() => deleteTodo(todo.id)}
											className="btn btn-danger"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												fill="none"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M4 7l16 0" />
												<path d="M10 11l0 6" />
												<path d="M14 11l0 6" />
												<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
												<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
											</svg>
										</button>
									</div>
								</li>
							</div>
						)
					})
				) : (
					<div className="empty-list-styles">
						&#39;Illusion is needed to disguise the emptiness within&#39;
					</div>
				)}
			</ul>
		</>
	)
}
