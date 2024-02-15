import { useRef } from "react"

interface DialogProps {
	isOpen: boolean
	closeDialog: () => void
}

function Dialog({ isOpen, closeDialog }: DialogProps) {
	return (
		<>
			<dialog open={isOpen}>
				<svg
					className="close"
					onClick={closeDialog}
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
					<path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
					<path d="M9 9l6 6m0 -6l-6 6" />
				</svg>
				<form className="dialog-form" action="submit">
					<h2>Edit your Todo</h2>
					<input type="text" />
				</form>
				<button onClick={closeDialog}>Close</button>
			</dialog>
		</>
	)
}

export default Dialog
