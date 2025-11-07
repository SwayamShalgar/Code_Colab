enum USER_CONNECTION_STATUS {
	OFFLINE = "offline",
	ONLINE = "online",
}

interface User {
	username: string
	roomId: string
	status: USER_CONNECTION_STATUS
	cursorPosition: number
	typing: boolean
	currentFile: string | null
	socketId: string
	isAdmin: boolean
	isCollaborative: boolean
}

interface Task {
	id: string
	title: string
	description: string
	testCases: Array<{
		input: string
		expectedOutput: string
	}>
}

export { USER_CONNECTION_STATUS, User, Task }
