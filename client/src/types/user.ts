enum USER_CONNECTION_STATUS {
    OFFLINE = "offline",
    ONLINE = "online",
}

interface User {
    username: string
    roomId: string
    isAdmin?: boolean
    isCollaborative?: boolean
    tasks?: Array<{
        id: string
        title: string
        description: string
        testCases: Array<{
            input: string
            expectedOutput: string
        }>
    }>
}

interface RemoteUser extends User {
    status: USER_CONNECTION_STATUS
    cursorPosition: number
    typing: boolean
    currentFile: string
    socketId: string
    isAdmin: boolean
    isCollaborative: boolean
}

enum USER_STATUS {
    INITIAL = "initial",
    CONNECTING = "connecting",
    ATTEMPTING_JOIN = "attempting-join",
    WAITING_FOR_ADMISSION = "waiting-for-admission",
    JOINED = "joined",
    CONNECTION_FAILED = "connection-failed",
    DISCONNECTED = "disconnected",
    REJECTED = "rejected",
}

export { USER_CONNECTION_STATUS, USER_STATUS, RemoteUser, User }
