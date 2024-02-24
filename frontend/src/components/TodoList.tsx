import { useEffect, useState } from "react"
import Todo from "../Todo"
import EditButton from "./EditButton"

const TodoList = () => {
	const [todos, setTodos] = useState<Todo[]>([])

	useEffect(() => {
		getTodos()
	}, [todos])

	async function getTodos() {
		try {
			const response = await fetch("http://localhost:5000/allTodos")
			const TodoArr = await response.json()
			// Map over the fetched todos and convert them into Todo objects
			const formattedTodos = TodoArr.map(
				(todo: Todo) =>
					new Todo(todo.todo_title, todo.is_complete, todo.todo_id)
			)
			// Set the formatted todos to the state
			setTodos(formattedTodos)
		} catch (error) {
			console.error(error.message)
		}
	}

	async function toggleComplete(id: number) {
		try {
			await fetch(`http://localhost:5000/toggleIsComplete/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
			})
		} catch (error) {
			console.error(error.message)
		}
	}

	async function deleteTodo(id: number) {
		try {
			await fetch(`http://localhost:5000/deleteTodo/${id}`, {
				method: "DELETE",
			})
		} catch (error) {
			console.error(error.message)
		}
	}

	async function editTodo(id: number, todo_title: string) {
		try {
			await fetch(`http://localhost:5000/editTodo/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ todo_title: `${todo_title}` }),
			})
		} catch (error) {
			console.error(error.message)
		}
	}

	return (
		<ul className="todoUl">
			{todos.length > 0 ? (
				todos.map((todo: Todo) => {
					return (
						<>
							<div key={todo.todo_id}>
								<li className="li">
									<div className="titleAndStatus">
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
											<path d="M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
											<path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
											<path d="M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
											<path d="M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
											<path d="M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
											<path d="M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
										</svg>
										<input
											type="checkbox"
											checked={todo.is_complete}
											name="todo"
											onChange={() => toggleComplete(todo.todo_id)}
										/>
										<p
											className={
												todo.is_complete
													? "text-decoration-line-through"
													: "text-decoration-none"
											}
										>
											{todo.todo_title}
										</p>
									</div>
									<div className="buttons">
										{/* <EditButton
											todo_title={todo.todo_title}
											editTodo={editTodo(todo.todo_id, todo.todo_title)}
											editId={todo.todo_id}
										></EditButton> */}
										<button
											onClick={() => deleteTodo(todo.todo_id)}
											className="btn btn-danger"
										>
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
						</>
					)
				})
			) : (
				<div className="empty-list-styles">
					&#39;Illusion is needed to disguise the emptiness within&#39;
				</div>
			)}
		</ul>
	)
}

export default TodoList
