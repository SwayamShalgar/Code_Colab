import SplitterComponent from "@/components/SplitterComponent"
import ConnectionStatusPage from "@/components/connection/ConnectionStatusPage"
import WaitingForAdmission from "@/components/connection/WaitingForAdmission"
import RejectedPage from "@/components/connection/RejectedPage"
import AdmissionModal from "@/components/common/AdmissionModal"
import Sidebar from "@/components/sidebar/Sidebar"
import WorkSpace from "@/components/workspace"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import useFullScreen from "@/hooks/useFullScreen"
import useUserActivity from "@/hooks/useUserActivity"
import { SocketEvent } from "@/types/socket"
import { USER_STATUS, User } from "@/types/user"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

function EditorPage() {
    // Listen user online/offline status
    useUserActivity()
    // Enable fullscreen mode
    useFullScreen()
    const navigate = useNavigate()
    const { roomId } = useParams()
    const { status, setCurrentUser, currentUser, pendingUsers, setPendingUsers } = useAppContext()
    const { socket } = useSocket()
    const location = useLocation()
    const [showAdmissionModal, setShowAdmissionModal] = useState(false)

    useEffect(() => {
        if (currentUser.username.length > 0) return
        const username = location.state?.username
        if (username === undefined) {
            navigate("/", {
                state: { roomId },
            })
        } else if (roomId) {
            const user: User = { username, roomId }
            setCurrentUser(user)
            socket.emit(SocketEvent.JOIN_REQUEST, user)
        }
    }, [
        currentUser.username,
        location.state?.username,
        navigate,
        roomId,
        setCurrentUser,
        socket,
    ])

    // Show admission modal when there are pending users and current user is admin
    useEffect(() => {
        if (pendingUsers.length > 0 && currentUser.isAdmin) {
            setShowAdmissionModal(true)
        }
    }, [pendingUsers, currentUser.isAdmin])

    const handleCloseAdmissionModal = () => {
        setShowAdmissionModal(false)
        // Remove the first pending user from the list
        setPendingUsers((prev) => prev.slice(1))
        
        // If there are more pending users, show modal again
        if (pendingUsers.length > 1) {
            setTimeout(() => setShowAdmissionModal(true), 300)
        }
    }

    if (status === USER_STATUS.CONNECTION_FAILED) {
        return <ConnectionStatusPage />
    }

    if (status === USER_STATUS.WAITING_FOR_ADMISSION) {
        return <WaitingForAdmission />
    }

    if (status === USER_STATUS.REJECTED) {
        return <RejectedPage />
    }

    return (
        <>
            <SplitterComponent>
                <Sidebar />
                <WorkSpace/>
            </SplitterComponent>

            {/* Admission Modal for Admin */}
            {showAdmissionModal && pendingUsers.length > 0 && (
                <AdmissionModal
                    pendingUser={pendingUsers[0]}
                    onClose={handleCloseAdmissionModal}
                />
            )}
        </>
    )
}

export default EditorPage
