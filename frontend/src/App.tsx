import { useEffect, useState } from "react"
import "./styles.css"
import Todo from "./Todo"
import Form from "./components/Form"
import TodoList from "./components/TodoList"

function App() {
	// array of todo state
	const [todos, setTodos] = useState<Todo[]>(() => {
		const storeValue = localStorage.getItem("TODOS")
		return storeValue === null ? [] : JSON.parse(storeValue)
	})
	useEffect(() => {
		localStorage.setItem("TODOS", JSON.stringify(todos))
	}, [todos])

	// STATE Functions
	function toggleComplete(id: string, isComplete: boolean): void {
		//change todos to be a mapped version where if the id is equal to toddledId, isComplete is changed.
		setTodos((todos) => {
			return todos.map((todo) => {
				if (todo.todo_id === id) {
					return { ...todo, is_complete: isComplete }
				}
				return todo
			}) as Todo[]
		})
	}

	function editTodo(id: string, oldTitle: string) {
		// setEditId(id)
		// if (editMode && title === "") return alert("Todo cannot be blank")
		// setEditMode(!editMode)
		const title = prompt("What do you wish to change your todo to?", oldTitle)
		if (title != null && title != "") {
			setTodos((todos) => {
				return todos.map((todo) => {
					if (todo.todo_id === id) {
						return { ...todo, todo_title: title }
					}
					return todo
				})
			})
		}
	}

	function saveTodo(title: string) {
		setTodos((todos) => {
			const newTodoObj = new Todo(title, false, crypto.randomUUID())
			return [...todos, newTodoObj]
		})
	}

	function deleteTodo(id: string) {
		if (confirm("Are you sure you want to delete this?")) {
			setTodos((todos) => {
				return todos.filter((todo) => todo.todo_id != id)
			})
		}
	}

	return (
		<>
			<Form saveTodo={saveTodo}></Form>
			<TodoList editTodo={editTodo} toggleComplete={toggleComplete}></TodoList>
		</>
	)
}

export default App
