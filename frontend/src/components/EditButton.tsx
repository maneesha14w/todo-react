import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Todo from "../Todo"

interface EditButtonProps {
	todo: Todo
	editTodo(editId: number, newTodo_title: string): Promise<void>
}

function EditButton({ todo, editTodo }: EditButtonProps) {
	const [editText, setEditText] = useState(todo.todo_title)
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	async function onSavePressed() {
		await editTodo(todo.todo_id, editText)
	}

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
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
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Edit Todo</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={() => {}} method="get">
						<div>
							<input
								className="form-control form-control-lg"
								type="text"
								value={editText}
								onChange={(e) => setEditText(e.target.value)}
								id="newTodo"
								autoComplete="off"
							/>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button className="btn" type="submit" onClick={onSavePressed}>
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
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default EditButton
