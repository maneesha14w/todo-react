import Todo from "../Todo"

interface TodoListProps {
	todos: Todo[]
	toggleComplete: (id: string, isComplete: boolean) => void
	editTodo: (id: string, title: string) => void
	deleteTodo: (id: string) => void
}

const TodoList = ({
	todos,
	toggleComplete,
	editTodo,
	deleteTodo,
}: TodoListProps) => {
	return (
		<ul>
			{todos.length > 0 ? (
				todos.map((todo: Todo) => {
					return (
						<>
							<div key={todo.id}>
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
											onClick={() => editTodo(todo.id, todo.title)}
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
											onClick={() => deleteTodo(todo.id)}
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
