import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { SocketEvent } from "@/types/socket"
import { USER_STATUS } from "@/types/user"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import logo from "@/assets/logo.svg"

const FormComponent = () => {
    const location = useLocation()
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext()
    const { socket } = useSocket()
    const [isCreatingRoom, setIsCreatingRoom] = useState(false)
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [testCases, setTestCases] = useState<Array<{ input: string; expectedOutput: string }>>([
        { input: "", expectedOutput: "" }
    ])

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const createNewRoomId = () => {
        setCurrentUser({ ...currentUser, roomId: uuidv4() })
        setIsCreatingRoom(true)
        toast.success("Created a new Room Id")
        usernameRef.current?.focus()
    }

    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setCurrentUser({ ...currentUser, [name]: value })
    }

    const toggleCollaborationMode = () => {
        setCurrentUser({ 
            ...currentUser, 
            isCollaborative: !currentUser.isCollaborative 
        })
    }

    const addTestCase = () => {
        setTestCases([...testCases, { input: "", expectedOutput: "" }])
    }

    const removeTestCase = (index: number) => {
        setTestCases(testCases.filter((_, i) => i !== index))
    }

    const updateTestCase = (index: number, field: "input" | "expectedOutput", value: string) => {
        const updated = [...testCases]
        updated[index][field] = value
        setTestCases(updated)
    }

    const saveTask = () => {
        if (!taskTitle.trim()) {
            toast.error("Task title is required")
            return
        }
        
        const validTestCases = testCases.filter(
            tc => tc.input.trim() || tc.expectedOutput.trim()
        )
        
        const newTask = {
            id: editingTaskId || uuidv4(),
            title: taskTitle,
            description: taskDescription,
            testCases: validTestCases
        }

        const existingTasks = currentUser.tasks || []
        
        if (editingTaskId) {
            // Update existing task
            setCurrentUser({
                ...currentUser,
                tasks: existingTasks.map(t => t.id === editingTaskId ? newTask : t)
            })
            toast.success("Task updated!")
        } else {
            // Add new task
            setCurrentUser({
                ...currentUser,
                tasks: [...existingTasks, newTask]
            })
            toast.success("Task added!")
        }
        
        // Reset form
        setShowTaskForm(false)
        setEditingTaskId(null)
        setTaskTitle("")
        setTaskDescription("")
        setTestCases([{ input: "", expectedOutput: "" }])
    }

    const editTask = (taskId: string) => {
        const task = currentUser.tasks?.find(t => t.id === taskId)
        if (task) {
            setEditingTaskId(taskId)
            setTaskTitle(task.title)
            setTaskDescription(task.description)
            setTestCases(task.testCases.length > 0 ? task.testCases : [{ input: "", expectedOutput: "" }])
            setShowTaskForm(true)
        }
    }

    const removeTask = (taskId: string) => {
        setCurrentUser({
            ...currentUser,
            tasks: currentUser.tasks?.filter(t => t.id !== taskId)
        })
        toast.success("Task removed!")
    }

    const cancelTaskForm = () => {
        setShowTaskForm(false)
        setEditingTaskId(null)
        setTaskTitle("")
        setTaskDescription("")
        setTestCases([{ input: "", expectedOutput: "" }])
    }

    const validateForm = () => {
        if (currentUser.username.trim().length === 0) {
            toast.error("Enter your username")
            return false
        } else if (currentUser.roomId.trim().length === 0) {
            toast.error("Enter a room id")
            return false
        } else if (currentUser.roomId.trim().length < 5) {
            toast.error("ROOM Id must be at least 5 characters long")
            return false
        } else if (currentUser.username.trim().length < 3) {
            toast.error("Username must be at least 3 characters long")
            return false
        }
        return true
    }

    const joinRoom = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (status === USER_STATUS.ATTEMPTING_JOIN) return
        if (!validateForm()) return
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
        }
    }, [currentUser, location.state?.redirect, navigate, setStatus, socket, status])

    return (
        <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4 p-4 sm:w-[500px] sm:p-8">
            <img src={logo} alt="Logo" className="w-full"/>
            <form onSubmit={joinRoom} className="flex w-full flex-col gap-4">
                <input
                    type="text"
                    name="roomId"
                    placeholder="Room Id"
                    className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
                    onChange={handleInputChanges}
                    value={currentUser.roomId}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
                    onChange={handleInputChanges}
                    value={currentUser.username}
                    ref={usernameRef}
                />
                
                {/* Collaboration Mode Toggle - Only show when creating a new room */}
                {isCreatingRoom && (
                    <>
                        <div className="flex flex-col gap-2 rounded-md border border-gray-500 bg-darkHover p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-white">
                                        Collaboration Mode
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        {currentUser.isCollaborative 
                                            ? "Changes sync between all users" 
                                            : "Each user has independent code"}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={toggleCollaborationMode}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        currentUser.isCollaborative 
                                            ? "bg-primary" 
                                            : "bg-gray-600"
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            currentUser.isCollaborative 
                                                ? "translate-x-6" 
                                                : "translate-x-1"
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Tasks Setup */}
                        <div className="flex flex-col gap-2 rounded-md border border-gray-500 bg-darkHover p-4">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-300">
                                    Coding Tasks {currentUser.tasks && currentUser.tasks.length > 0 && `(${currentUser.tasks.length})`}
                                </span>
                                {!showTaskForm && (
                                    <button
                                        type="button"
                                        onClick={() => setShowTaskForm(true)}
                                        className="text-xs text-primary hover:underline"
                                    >
                                        + Add Task
                                    </button>
                                )}
                            </div>

                            {/* Tasks List */}
                            {!showTaskForm && currentUser.tasks && currentUser.tasks.length > 0 && (
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {currentUser.tasks.map((task, idx) => (
                                        <div key={task.id} className="rounded border border-gray-600 bg-gray-900 p-2">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <span className="text-sm font-semibold text-white">
                                                        {idx + 1}. {task.title}
                                                    </span>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {task.testCases.length} test case(s)
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => editTask(task.id)}
                                                        className="text-xs text-blue-400 hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTask(task.id)}
                                                        className="text-xs text-red-400 hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {!showTaskForm && (!currentUser.tasks || currentUser.tasks.length === 0) && (
                                <p className="text-xs text-gray-500 text-center py-2">
                                    No tasks added yet
                                </p>
                            )}

                            {/* Task Form */}
                            {showTaskForm && (
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Task Title"
                                        value={taskTitle}
                                        onChange={(e) => setTaskTitle(e.target.value)}
                                        className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none"
                                    />
                                    <textarea
                                        placeholder="Task Description"
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                        rows={3}
                                        className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none"
                                    />
                                    
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold text-gray-300">
                                                Test Cases
                                            </span>
                                            <button
                                                type="button"
                                                onClick={addTestCase}
                                                className="text-xs text-primary hover:underline"
                                            >
                                                + Add Test Case
                                            </button>
                                        </div>
                                        
                                        {testCases.map((tc, index) => (
                                            <div key={index} className="space-y-1 rounded border border-gray-600 bg-gray-900 p-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-400">
                                                        Test Case {index + 1}
                                                    </span>
                                                    {testCases.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTestCase(index)}
                                                            className="text-xs text-red-400 hover:underline"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="mb-1 block text-xs text-gray-400">
                                                        Input (one value per line if multiple inputs)
                                                    </label>
                                                    <textarea
                                                        placeholder="Example for 2 inputs:&#10;12&#10;15"
                                                        value={tc.input}
                                                        onChange={(e) => updateTestCase(index, "input", e.target.value)}
                                                        rows={3}
                                                        className="w-full rounded border border-gray-700 bg-gray-950 px-2 py-1 text-xs text-white focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-1 block text-xs text-gray-400">
                                                        Expected Output
                                                    </label>
                                                    <textarea
                                                        placeholder="27"
                                                        value={tc.expectedOutput}
                                                        onChange={(e) => updateTestCase(index, "expectedOutput", e.target.value)}
                                                        rows={2}
                                                        className="w-full rounded border border-gray-700 bg-gray-950 px-2 py-1 text-xs text-white focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={saveTask}
                                            className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-black"
                                        >
                                            {editingTaskId ? "Update Task" : "Save Task"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelTaskForm}
                                            className="rounded-md border border-gray-600 px-4 py-2 text-sm text-gray-300"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
                
                <button
                    type="submit"
                    className="mt-2 w-full rounded-md bg-primary px-8 py-3 text-lg font-semibold text-black"
                >
                    Join
                </button>
            </form>
            <button
                className="cursor-pointer select-none underline"
                onClick={createNewRoomId}
            >
                Generate Unique Room Id
            </button>
        </div>
    )
}

export default FormComponent
