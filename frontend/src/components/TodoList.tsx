import { useEffect, useState } from "react"
import Todo from "../Todo"

interface TodoListProps {
	toggleComplete: (id: string, isComplete: boolean) => void
	editTodo: (id: string, title: string) => void
}

const TodoList = ({ editTodo }: TodoListProps) => {
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
			const response = await fetch(
				`http://localhost:5000/toggleIsComplete/${id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
				}
			)
			console.log(response)
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

	return (
		<ul>
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
										<p className={todo.is_complete ? "strike" : ""}>
											{todo.todo_title}
										</p>
									</div>
									<div className="buttons">
										<button
											className="btn btn-edit"
											onClick={() => editTodo(todo.todo_id, todo.todo_title)}
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
												<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
												<path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
												<path d="M16 5l3 3" />
											</svg>
										</button>
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
