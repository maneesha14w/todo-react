export default class Todo {
	todo_title: string
	is_complete: boolean
	todo_id: string

	constructor(title: string, isComplete: boolean, id: string) {
		this.todo_title = title
		this.is_complete = isComplete
		this.todo_id = id
	}
}
