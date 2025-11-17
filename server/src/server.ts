import express, { Response, Request } from "express"
import dotenv from "dotenv"
import http from "http"
import cors from "cors"
import { SocketEvent, SocketId } from "./types/socket"
import { USER_CONNECTION_STATUS, User, Task } from "./types/user"
import { Server } from "socket.io"
import path from "path"

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())

app.use(express.static(path.join(__dirname, "public"))) // Serve static files

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: "*",
	},
	maxHttpBufferSize: 1e8,
	pingTimeout: 60000,
})

let userSocketMap: User[] = []
let pendingUsers: Map<string, { username: string; roomId: string; socketId: string }> = new Map()
let roomSettings: Map<string, { isCollaborative: boolean; tasks?: Task[] }> = new Map()

// Function to get all users in a room
function getUsersInRoom(roomId: string): User[] {
	return userSocketMap.filter((user) => user.roomId == roomId)
}

// Function to check if user is admin in a room
function isAdmin(socketId: SocketId, roomId: string): boolean {
	const user = userSocketMap.find(
		(user) => user.socketId === socketId && user.roomId === roomId
	)
	return user?.isAdmin ?? false
}

// Function to get room collaboration setting
function isRoomCollaborative(roomId: string): boolean {
	return roomSettings.get(roomId)?.isCollaborative ?? true
}

// Function to get room tasks
function getRoomTasks(roomId: string): Task[] | undefined {
	return roomSettings.get(roomId)?.tasks
}

// Function to get room id by socket id
function getRoomId(socketId: SocketId): string | null {
	const roomId = userSocketMap.find(
		(user) => user.socketId === socketId
	)?.roomId

	if (!roomId) {
		console.error("Room ID is undefined for socket ID:", socketId)
		return null
	}
	return roomId
}

function getUserBySocketId(socketId: SocketId): User | null {
	const user = userSocketMap.find((user) => user.socketId === socketId)
	if (!user) {
		console.error("User not found for socket ID:", socketId)
		return null
	}
	return user
}

io.on("connection", (socket) => {
	// Handle user actions
	socket.on(SocketEvent.JOIN_REQUEST, ({ roomId, username, isCollaborative, tasks }) => {
		// Check is username exist in the room
		const isUsernameExist = getUsersInRoom(roomId).filter(
			(u) => u.username === username
		)
		if (isUsernameExist.length > 0) {
			io.to(socket.id).emit(SocketEvent.USERNAME_EXISTS)
			return
		}

		const existingUsers = getUsersInRoom(roomId)
		const isFirstUser = existingUsers.length === 0

		// If first user, make them admin and join directly
		if (isFirstUser) {
			// Set room collaboration mode and tasks (default to true if not provided)
			roomSettings.set(roomId, { 
				isCollaborative: isCollaborative ?? true,
				tasks: tasks || undefined
			})
			
			const user = {
				username,
				roomId,
				status: USER_CONNECTION_STATUS.ONLINE,
				cursorPosition: 0,
				typing: false,
				socketId: socket.id,
				currentFile: null,
				isAdmin: true,
				isCollaborative: isCollaborative ?? true,
			}
			userSocketMap.push(user)
			socket.join(roomId)
			const users = getUsersInRoom(roomId)
			const roomTasks = getRoomTasks(roomId)
			io.to(socket.id).emit(SocketEvent.JOIN_ACCEPTED, { user, users, tasks: roomTasks })
		} else {
			// Store pending user and notify them they're waiting
			pendingUsers.set(socket.id, { username, roomId, socketId: socket.id })
			io.to(socket.id).emit(SocketEvent.WAITING_FOR_ADMISSION)

			// Notify admin about the new join request
			const admin = existingUsers.find((u) => u.isAdmin)
			if (admin) {
				io.to(admin.socketId).emit(SocketEvent.ADMISSION_REQUEST, {
					username,
					socketId: socket.id,
				})
			}
		}
	})

	// Handle admission response from admin
	socket.on(SocketEvent.ADMISSION_RESPONSE, ({ socketId, username, accepted }) => {
		const pendingUser = pendingUsers.get(socketId)
		if (!pendingUser) return

		const roomId = pendingUser.roomId

		// Verify the requester is admin
		if (!isAdmin(socket.id, roomId)) {
			return
		}

		if (accepted) {
			const roomCollaborative = isRoomCollaborative(roomId)
			
			const user = {
				username: pendingUser.username,
				roomId: pendingUser.roomId,
				status: USER_CONNECTION_STATUS.ONLINE,
				cursorPosition: 0,
				typing: false,
				socketId: pendingUser.socketId,
				currentFile: null,
				isAdmin: false,
				isCollaborative: roomCollaborative,
			}
			userSocketMap.push(user)
			
			const userSocket = io.sockets.sockets.get(socketId)
			if (userSocket) {
				userSocket.join(roomId)
				
				// Notify all users in the room (including admin) about the new user
				// Use the new user's socket to broadcast to ensure they're in the room
				userSocket.broadcast.to(roomId).emit(SocketEvent.USER_JOINED, { user })
				
				// Send the current users list and tasks to the newly joined user
				const users = getUsersInRoom(roomId)
				const roomTasks = getRoomTasks(roomId)
				userSocket.emit(SocketEvent.JOIN_ACCEPTED, { user, users, tasks: roomTasks })
				
				// Also notify the new user about themselves joining
				userSocket.emit(SocketEvent.USER_JOINED, { user })
			}
		} else {
			io.to(socketId).emit(SocketEvent.USER_REJECTED)
		}

		pendingUsers.delete(socketId)
	})

	socket.on("disconnecting", () => {
		// Check if user is in pending list
		if (pendingUsers.has(socket.id)) {
			pendingUsers.delete(socket.id)
			return
		}

		const user = getUserBySocketId(socket.id)
		if (!user) return
		const roomId = user.roomId
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.USER_DISCONNECTED, { user })
		userSocketMap = userSocketMap.filter((u) => u.socketId !== socket.id)
		socket.leave(roomId)
		
		// Clean up room settings if no users left
		if (getUsersInRoom(roomId).length === 0) {
			roomSettings.delete(roomId)
		}
	})

	// Handle file actions
	socket.on(
		SocketEvent.SYNC_FILE_STRUCTURE,
		({ fileStructure, openFiles, activeFile, socketId }) => {
			io.to(socketId).emit(SocketEvent.SYNC_FILE_STRUCTURE, {
				fileStructure,
				openFiles,
				activeFile,
			})
		}
	)

	socket.on(
		SocketEvent.DIRECTORY_CREATED,
		({ parentDirId, newDirectory }) => {
			const roomId = getRoomId(socket.id)
			if (!roomId) return
			
			// Check if room is collaborative
			const roomCollaborative = isRoomCollaborative(roomId)
			if (!roomCollaborative) {
				// In non-collaborative mode, don't broadcast directory creation
				return
			}
			
			socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_CREATED, {
				parentDirId,
				newDirectory,
			})
		}
	)

	socket.on(SocketEvent.DIRECTORY_UPDATED, ({ dirId, children }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		
		// Check if room is collaborative
		const roomCollaborative = isRoomCollaborative(roomId)
		if (!roomCollaborative) {
			// In non-collaborative mode, don't broadcast directory updates
			return
		}
		
		socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_UPDATED, {
			dirId,
			children,
		})
	})

	socket.on(SocketEvent.DIRECTORY_RENAMED, ({ dirId, newName }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		
		// Check if room is collaborative
		const roomCollaborative = isRoomCollaborative(roomId)
		if (!roomCollaborative) {
			// In non-collaborative mode, don't broadcast directory rename
			return
		}
		
		socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_RENAMED, {
			dirId,
			newName,
		})
	})

	socket.on(SocketEvent.DIRECTORY_DELETED, ({ dirId }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		
		// Check if room is collaborative
		const roomCollaborative = isRoomCollaborative(roomId)
		if (!roomCollaborative) {
			// In non-collaborative mode, don't broadcast directory deletion
			return
		}
		
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.DIRECTORY_DELETED, { dirId })
	})

	socket.on(SocketEvent.FILE_CREATED, ({ parentDirId, newFile }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		
		// Check if room is collaborative
		const roomCollaborative = isRoomCollaborative(roomId)
		if (!roomCollaborative) {
			// In non-collaborative mode, don't broadcast file creation
			return
		}
		
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.FILE_CREATED, { parentDirId, newFile })
	})

	socket.on(SocketEvent.FILE_UPDATED, ({ fileId, newContent }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		
		const user = getUserBySocketId(socket.id)
		if (!user) return
		
		// Check if room is collaborative
		const roomCollaborative = isRoomCollaborative(roomId)
		if (!roomCollaborative) {
			// In non-collaborative mode, don't broadcast changes to others
			return
		}
		
		// Only broadcast in collaborative mode
		socket.broadcast.to(roomId).emit(SocketEvent.FILE_UPDATED, {
			fileId,
			newContent,
		})
	})

	socket.on(SocketEvent.FILE_RENAMED, ({ fileId, newName }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		
		// Check if room is collaborative
		const roomCollaborative = isRoomCollaborative(roomId)
		if (!roomCollaborative) {
			// In non-collaborative mode, don't broadcast file rename
			return
		}
		
		socket.broadcast.to(roomId).emit(SocketEvent.FILE_RENAMED, {
			fileId,
			newName,
		})
	})

	socket.on(SocketEvent.FILE_DELETED, ({ fileId }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		
		// Check if room is collaborative
		const roomCollaborative = isRoomCollaborative(roomId)
		if (!roomCollaborative) {
			// In non-collaborative mode, don't broadcast file deletion
			return
		}
		
		socket.broadcast.to(roomId).emit(SocketEvent.FILE_DELETED, { fileId })
	})

	// Handle user status
	socket.on(SocketEvent.USER_OFFLINE, ({ socketId }) => {
		userSocketMap = userSocketMap.map((user) => {
			if (user.socketId === socketId) {
				return { ...user, status: USER_CONNECTION_STATUS.OFFLINE }
			}
			return user
		})
		const roomId = getRoomId(socketId)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.USER_OFFLINE, { socketId })
	})

	socket.on(SocketEvent.USER_ONLINE, ({ socketId }) => {
		userSocketMap = userSocketMap.map((user) => {
			if (user.socketId === socketId) {
				return { ...user, status: USER_CONNECTION_STATUS.ONLINE }
			}
			return user
		})
		const roomId = getRoomId(socketId)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.USER_ONLINE, { socketId })
	})

	// Handle chat actions
	socket.on(SocketEvent.SEND_MESSAGE, ({ message }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.RECEIVE_MESSAGE, { message })
	})

	// Handle cursor position
	socket.on(SocketEvent.TYPING_START, ({ cursorPosition }) => {
		userSocketMap = userSocketMap.map((user) => {
			if (user.socketId === socket.id) {
				return { ...user, typing: true, cursorPosition }
			}
			return user
		})
		const user = getUserBySocketId(socket.id)
		if (!user) return
		const roomId = user.roomId
		socket.broadcast.to(roomId).emit(SocketEvent.TYPING_START, { user })
	})

	socket.on(SocketEvent.TYPING_PAUSE, () => {
		userSocketMap = userSocketMap.map((user) => {
			if (user.socketId === socket.id) {
				return { ...user, typing: false }
			}
			return user
		})
		const user = getUserBySocketId(socket.id)
		if (!user) return
		const roomId = user.roomId
		socket.broadcast.to(roomId).emit(SocketEvent.TYPING_PAUSE, { user })
	})

	socket.on(SocketEvent.REQUEST_DRAWING, () => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.REQUEST_DRAWING, { socketId: socket.id })
	})

	socket.on(SocketEvent.SYNC_DRAWING, ({ drawingData, socketId }) => {
		socket.broadcast
			.to(socketId)
			.emit(SocketEvent.SYNC_DRAWING, { drawingData })
	})

	socket.on(SocketEvent.DRAWING_UPDATE, ({ snapshot }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.DRAWING_UPDATE, {
			snapshot,
		})
	})

	// Media / WebRTC signalling handlers
	// When a user wants to join media in the room
	socket.on(SocketEvent.MEDIA_JOIN, () => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		const user = getUserBySocketId(socket.id)
		// notify other peers in the room that this peer joined media
		socket.broadcast.to(roomId).emit(SocketEvent.MEDIA_JOIN, {
			socketId: socket.id,
			username: user?.username,
		})
	})

	// Forward an SDP offer to a specific target peer
	socket.on(SocketEvent.MEDIA_OFFER, ({ targetSocketId, offer }) => {
		if (!targetSocketId) return
		io.to(targetSocketId).emit(SocketEvent.MEDIA_OFFER, {
			from: socket.id,
			offer,
		})
	})

	// Forward an SDP answer to the original offerer
	socket.on(SocketEvent.MEDIA_ANSWER, ({ targetSocketId, answer }) => {
		if (!targetSocketId) return
		io.to(targetSocketId).emit(SocketEvent.MEDIA_ANSWER, {
			from: socket.id,
			answer,
		})
	})

	// Forward ICE candidates to a specific peer
	socket.on(SocketEvent.MEDIA_ICE, ({ targetSocketId, candidate }) => {
		if (!targetSocketId) return
		io.to(targetSocketId).emit(SocketEvent.MEDIA_ICE, {
			from: socket.id,
			candidate,
		})
	})

	// Notify others when a peer leaves media
	socket.on(SocketEvent.MEDIA_LEAVE, () => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.MEDIA_LEAVE, {
			socketId: socket.id,
		})
	})

	// Toggle events (screen, mic, camera) — broadcast to room
	socket.on(SocketEvent.TOGGLE_SCREEN_SHARE, ({ enabled }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.TOGGLE_SCREEN_SHARE, {
			socketId: socket.id,
			enabled,
		})
	})

	socket.on(SocketEvent.TOGGLE_MIC, ({ enabled }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.TOGGLE_MIC, {
			socketId: socket.id,
			enabled,
		})
	})

	socket.on(SocketEvent.TOGGLE_CAMERA, ({ enabled }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.TOGGLE_CAMERA, {
			socketId: socket.id,
			enabled,
		})
	})
})

const PORT = process.env.PORT || 3000

app.get("/", (req: Request, res: Response) => {
	// Send the index.html file
	res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})
