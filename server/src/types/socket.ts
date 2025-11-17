import { Socket } from "socket.io"

type SocketId = string

enum SocketEvent {
	JOIN_REQUEST = "join-request",
	JOIN_ACCEPTED = "join-accepted",
	USER_JOINED = "user-joined",
	USER_DISCONNECTED = "user-disconnected",
	SYNC_FILE_STRUCTURE = "sync-file-structure",
	DIRECTORY_CREATED = "directory-created",
	DIRECTORY_UPDATED = "directory-updated",
	DIRECTORY_RENAMED = "directory-renamed",
	DIRECTORY_DELETED = "directory-deleted",
	FILE_CREATED = "file-created",
	FILE_UPDATED = "file-updated",
	FILE_RENAMED = "file-renamed",
	FILE_DELETED = "file-deleted",
	USER_OFFLINE = "offline",
	USER_ONLINE = "online",
	SEND_MESSAGE = "send-message",
	RECEIVE_MESSAGE = "receive-message",
	TYPING_START = "typing-start",
	TYPING_PAUSE = "typing-pause",
	USERNAME_EXISTS = "username-exists",
	REQUEST_DRAWING = "request-drawing",
	SYNC_DRAWING = "sync-drawing",
	DRAWING_UPDATE = "drawing-update",
	WAITING_FOR_ADMISSION = "waiting-for-admission",
	ADMISSION_REQUEST = "admission-request",
	ADMISSION_RESPONSE = "admission-response",
	USER_REJECTED = "user-rejected",
	// Media / WebRTC signalling
	MEDIA_JOIN = "media-join",
	MEDIA_OFFER = "media-offer",
	MEDIA_ANSWER = "media-answer",
	MEDIA_ICE = "media-ice",
	MEDIA_LEAVE = "media-leave",
	TOGGLE_SCREEN_SHARE = "toggle-screen-share",
	TOGGLE_MIC = "toggle-mic",
	TOGGLE_CAMERA = "toggle-camera",
}

interface SocketContext {
	socket: Socket
}

export { SocketEvent, SocketContext, SocketId }
