import { useSocket } from "@/context/SocketContext"
import { SocketEvent } from "@/types/socket"
import { useEffect, useState } from "react"

interface PendingUser {
    username: string
    socketId: string
}

export function AdmissionModal() {
    const { socket } = useSocket()
    const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])

    useEffect(() => {
        const handleAdmissionRequest = ({
            username,
            socketId,
        }: PendingUser) => {
            setPendingUsers((prev) => [...prev, { username, socketId }])
        }

        socket.on(SocketEvent.ADMISSION_REQUEST, handleAdmissionRequest)

        return () => {
            socket.off(SocketEvent.ADMISSION_REQUEST, handleAdmissionRequest)
        }
    }, [socket])

    const handleResponse = (socketId: string, username: string, accepted: boolean) => {
        socket.emit(SocketEvent.ADMISSION_RESPONSE, {
            socketId,
            username,
            accepted,
        })
        setPendingUsers((prev) =>
            prev.filter((user) => user.socketId !== socketId),
        )
    }

    if (pendingUsers.length === 0) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Admission Requests
                </h2>
                <div className="space-y-3">
                    {pendingUsers.map((user) => (
                        <div
                            key={user.socketId}
                            className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {user.username}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        handleResponse(
                                            user.socketId,
                                            user.username,
                                            true,
                                        )
                                    }
                                    className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() =>
                                        handleResponse(
                                            user.socketId,
                                            user.username,
                                            false,
                                        )
                                    }
                                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
