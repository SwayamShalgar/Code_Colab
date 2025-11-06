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
}

interface PendingUser {
	username: string
	socketId: string
	roomId: string
}

export { USER_CONNECTION_STATUS, User, PendingUser }
