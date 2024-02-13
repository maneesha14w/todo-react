import React, { useEffect, useRef, useState } from "react"

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

const Modal: React.FC = ({ isOpen, onClose, children }: ModalProps) => {
	const [isModalOpen, setModalOpen] = useState(isOpen)

	useEffect(() => {
		setModalOpen(isOpen)
	}, [isOpen])

	useEffect(() => {
		const modalElement = modalRef.current
		if (modalElement) {
			if (isModalOpen) {
				modalElement.showModal()
			} else {
				modalElement.close()
			}
		}
	}, [isModalOpen])

	const modalRef = useRef<HTMLDialogElement | null>(null)

	return (
		<dialog ref={modalRef} className="modal">
			{children}
		</dialog>
	)
}

export default Modal
