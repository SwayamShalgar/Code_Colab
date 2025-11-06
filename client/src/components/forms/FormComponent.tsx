/**
 * FormComponent - Modern login/join room form with enhanced UX
 * 
 * Design improvements:
 * - Uses new Input and Button components
 * - Better validation feedback
 * - Loading states
 * - Smooth animations
 * - Improved spacing and typography
 */

import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { SocketEvent } from "@/types/socket"
import { USER_STATUS } from "@/types/user"
import { Button, Input, Card } from "@/components/ui"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import logo from "@/assets/logo.svg"
import { IoPersonOutline, IoKeyOutline, IoRefreshOutline } from "react-icons/io5"

const FormComponent = () => {
    const location = useLocation()
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext()
    const { socket } = useSocket()
    const [errors, setErrors] = useState({ roomId: "", username: "" })
    const [isLoading, setIsLoading] = useState(false)

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const createNewRoomId = () => {
        setCurrentUser({ ...currentUser, roomId: uuidv4() })
        setErrors({ ...errors, roomId: "" })
        toast.success("Created a new Room Id")
        usernameRef.current?.focus()
    }

    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setCurrentUser({ ...currentUser, [name]: value })
        // Clear error for this field when user types
        setErrors({ ...errors, [name]: "" })
    }

    const validateForm = () => {
        const newErrors = { roomId: "", username: "" }
        let isValid = true

        if (currentUser.username.trim().length === 0) {
            newErrors.username = "Username is required"
            isValid = false
        } else if (currentUser.username.trim().length < 3) {
            newErrors.username = "Username must be at least 3 characters"
            isValid = false
        }

        if (currentUser.roomId.trim().length === 0) {
            newErrors.roomId = "Room ID is required"
            isValid = false
        } else if (currentUser.roomId.trim().length < 5) {
            newErrors.roomId = "Room ID must be at least 5 characters"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const joinRoom = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (status === USER_STATUS.ATTEMPTING_JOIN) return
        if (!validateForm()) return
        
        setIsLoading(true)
        toast.loading("Joining room...")
        setStatus(USER_STATUS.ATTEMPTING_JOIN)
        socket.emit(SocketEvent.JOIN_REQUEST, currentUser)
    }

    useEffect(() => {
        if (currentUser.roomId.length > 0) return
        if (location.state?.roomId) {
            setCurrentUser({ ...currentUser, roomId: location.state.roomId })
            if (currentUser.username.length === 0) {
                toast.success("Enter your username")
            }
        }
    }, [currentUser, location.state?.roomId, setCurrentUser])

    useEffect(() => {
        if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
            socket.connect()
            setIsLoading(false)
            return
        }

        const isRedirect = sessionStorage.getItem("redirect") || false

        if (status === USER_STATUS.JOINED && !isRedirect) {
            const username = currentUser.username
            sessionStorage.setItem("redirect", "true")
            navigate(`/editor/${currentUser.roomId}`, {
                state: {
                    username,
                },
            })
        } else if (status === USER_STATUS.JOINED && isRedirect) {
            sessionStorage.removeItem("redirect")
            setStatus(USER_STATUS.DISCONNECTED)
            socket.disconnect()
            socket.connect()
            setIsLoading(false)
        }
    }, [currentUser, location.state?.redirect, navigate, setStatus, socket, status])

    return (
        <Card 
            variant="elevated" 
            className="w-full max-w-[500px] animate-scale-in"
        >
            <div className="flex flex-col items-center gap-6 p-6 sm:p-8">
                {/* Logo */}
                <div className="w-full flex justify-center">
                    <img 
                        src={logo} 
                        alt="Code-Sync Logo" 
                        className="w-48 sm:w-64 object-contain"
                    />
                </div>

                {/* Welcome Text */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        Welcome to Code-Sync
                    </h1>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                        Collaborate in real-time with your team
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={joinRoom} className="flex w-full flex-col gap-4">
                    <Input
                        type="text"
                        name="roomId"
                        placeholder="Enter Room ID"
                        label="Room ID"
                        value={currentUser.roomId}
                        onChange={handleInputChanges}
                        error={errors.roomId}
                        leftIcon={<IoKeyOutline size={20} />}
                        disabled={isLoading}
                    />
                    
                    <Input
                        ref={usernameRef}
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        label="Username"
                        value={currentUser.username}
                        onChange={handleInputChanges}
                        error={errors.username}
                        leftIcon={<IoPersonOutline size={20} />}
                        disabled={isLoading}
                    />
                    
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        isFullWidth
                        isLoading={isLoading}
                        className="mt-2"
                    >
                        Join Room
                    </Button>
                </form>

                {/* Generate Room ID Button */}
                <div className="w-full">
                    <Button
                        type="button"
                        variant="ghost"
                        size="md"
                        isFullWidth
                        onClick={createNewRoomId}
                        leftIcon={<IoRefreshOutline size={18} />}
                        disabled={isLoading}
                    >
                        Generate New Room ID
                    </Button>
                </div>

                {/* Footer Text */}
                <p className="text-xs text-center text-neutral-500 dark:text-neutral-400">
                    Share the Room ID with your team to collaborate
                </p>
            </div>
        </Card>
    )
}

export default FormComponent
