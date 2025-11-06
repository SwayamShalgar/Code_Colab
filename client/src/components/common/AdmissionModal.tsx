/**
 * AdmissionModal - Modal for admin to approve/reject join requests
 * 
 * Features:
 * - Shows pending users waiting to join
 * - Approve or reject buttons
 * - Modern, accessible design
 */

import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { SocketEvent } from "@/types/socket"
import { PendingUser } from "@/types/user"
import { IoCheckmarkCircle, IoCloseCircle, IoPerson } from "react-icons/io5"
import { Button, Card } from "@/components/ui"

interface AdmissionModalProps {
    pendingUser: PendingUser
    onClose: () => void
}

const AdmissionModal = ({ pendingUser, onClose }: AdmissionModalProps) => {
    const { socket } = useSocket()
    const { currentUser } = useAppContext()

    const handleApprove = () => {
        socket.emit(SocketEvent.ADMISSION_RESPONSE, {
            socketId: pendingUser.socketId,
            approved: true,
            roomId: currentUser.roomId,
        })
        onClose()
    }

    const handleReject = () => {
        socket.emit(SocketEvent.ADMISSION_RESPONSE, {
            socketId: pendingUser.socketId,
            approved: false,
            roomId: currentUser.roomId,
        })
        onClose()
    }

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <Card 
                variant="elevated" 
                className="w-full max-w-md mx-4 animate-scale-in"
            >
                <Card.Header>
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                        Join Request
                    </h2>
                </Card.Header>
                
                <Card.Body className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30">
                            <IoPerson className="text-2xl text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                User requesting to join:
                            </p>
                            <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                                {pendingUser.username}
                            </p>
                        </div>
                    </div>

                    <div className="p-3 rounded-lg bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800">
                        <p className="text-sm text-warning-800 dark:text-warning-200">
                            As the room admin, you can approve or reject this user's request to join the session.
                        </p>
                    </div>
                </Card.Body>

                <Card.Footer className="flex gap-3">
                    <Button
                        variant="danger"
                        size="md"
                        onClick={handleReject}
                        leftIcon={<IoCloseCircle size={20} />}
                        className="flex-1"
                    >
                        Reject
                    </Button>
                    <Button
                        variant="success"
                        size="md"
                        onClick={handleApprove}
                        leftIcon={<IoCheckmarkCircle size={20} />}
                        className="flex-1"
                    >
                        Approve
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default AdmissionModal
