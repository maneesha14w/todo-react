import { useEffect, useState } from "react"
import "./styles.css"
import Todo from "./Todo"
import Form from "./components/Form"
import TodoList from "./components/TodoList"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
	// array of todo state
	const [todos, setTodos] = useState<Todo[]>(() => {
		const storeValue = localStorage.getItem("TODOS")
		return storeValue === null ? [] : JSON.parse(storeValue)
	})
	useEffect(() => {
		localStorage.setItem("TODOS", JSON.stringify(todos))
	}, [todos])

	function saveTodo(title: string) {
		setTodos((todos) => {
			const newTodoObj = new Todo(title, false, parseInt(crypto.randomUUID()))
			return [...todos, newTodoObj]
		})
	}

	return (
		<>
			<Form saveTodo={saveTodo}></Form>
			<TodoList></TodoList>
		</>
	)
}

export default App
