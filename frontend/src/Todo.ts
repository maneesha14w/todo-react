export default class Todo {
	title: string
	isComplete: boolean
	id: string

	constructor(title: string, isComplete: boolean, id: string) {
		this.title = title
		this.isComplete = isComplete
		this.id = id
	}
}
