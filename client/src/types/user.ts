enum USER_CONNECTION_STATUS {
    OFFLINE = "offline",
    ONLINE = "online",
}

interface User {
    username: string
    roomId: string
    isAdmin?: boolean
}

interface RemoteUser extends User {
    status: USER_CONNECTION_STATUS
    cursorPosition: number
    typing: boolean
    currentFile: string
    socketId: string
    isAdmin: boolean
}

interface PendingUser {
    username: string
    socketId: string
    roomId: string
}

enum USER_STATUS {
    INITIAL = "initial",
    CONNECTING = "connecting",
    ATTEMPTING_JOIN = "attempting-join",
    WAITING_FOR_ADMISSION = "waiting-for-admission",
    JOINED = "joined",
    REJECTED = "rejected",
    CONNECTION_FAILED = "connection-failed",
    DISCONNECTED = "disconnected",
}

export { USER_CONNECTION_STATUS, USER_STATUS, RemoteUser, User, PendingUser }
