import React, { useState } from "react"

interface FormProps {
	saveTodo: (newTodo: string) => void
}

const Form = ({ saveTodo }: FormProps) => {
	// new todo text
	const [newTodo, setNewTodo] = useState("")
	const [submitClicked, setsubmitClicked] = useState(false)

	async function onSubmitTodo(e: React.FormEvent<HTMLFormElement>) {
		// Prevents the default form submission behavior of refreshing
		e.preventDefault()
		if (newTodo === "") return alert("Todo cannot be blank")
		setsubmitClicked(true)
		// if not blank create new obj and add to todos arr.
		saveTodo(newTodo)
		// save to db
		try {
			const response = await fetch("http://localhost:5000/todos", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ todo_title: `${newTodo}` }),
			})
			console.log(response)
		} catch (error) {
			console.error(error.message)
		}
		// make text field blank for new entry
		setNewTodo("")
		setsubmitClicked(false)
	}

	return (
		<form onSubmit={onSubmitTodo} method="get">
			<div className="form">
				<input
					type="text"
					placeholder="New Todo"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					id="newTodo"
					autoComplete="off"
				/>
				<button disabled={submitClicked} className="btn" type="submit">
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
						<path d="M19 8h-14" />
						<path d="M5 12h9" />
						<path d="M11 16h-6" />
						<path d="M15 16h6" />
						<path d="M18 13v6" />
					</svg>
				</button>
			</div>
		</form>
	)
}

export default Form
