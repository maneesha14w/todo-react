import { useState } from "react"

import "./styles.css"
import Todo from "./Todo"
import Form from "./components/Form"
import TodoList from "./components/TodoList"

function App() {
	// array of todo state
	const [todos, setTodos] = useState<Todo[]>([])
	// editMode State
	const [editMode, setEditMode] = useState(false)
	//editing todo
	const [editId, setEditId] = useState("")

	// STATE Functions
	function toggleComplete(id: string, isComplete: boolean): void {
		//change todos to be a mapped version where if the id is equal to toddledId, isComplete is changed.
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
			<TodoList
				todos={todos}
				deleteTodo={deleteTodo}
				editId={editId}
				editMode={editMode}
				editTodo={editTodo}
				toggleComplete={toggleComplete}
			></TodoList>
		</>
	)
}

export default App
