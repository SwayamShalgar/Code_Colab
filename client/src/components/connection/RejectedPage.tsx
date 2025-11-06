/**
 * RejectedPage - Screen shown when user's join request is rejected
 * 
 * Features:
 * - Clear rejection message
 * - Option to return to home
 */

import { Card, Button } from "@/components/ui"
import { useNavigate } from "react-router-dom"
import { IoCloseCircleOutline } from "react-icons/io5"

const RejectedPage = () => {
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate("/")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-danger-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900 p-4">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-danger-200 dark:bg-danger-900/20 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-danger-200 dark:bg-danger-900/20 rounded-full blur-3xl opacity-50"></div>
            </div>

            <Card variant="elevated" className="w-full max-w-md relative z-10">
                <Card.Body className="space-y-6 text-center py-8">
                    {/* Icon */}
                    <div className="flex justify-center">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-danger-100 dark:bg-danger-900/30">
                            <IoCloseCircleOutline className="text-5xl text-danger-600 dark:text-danger-400" />
                        </div>
                    </div>

                    {/* Title and Message */}
                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                            Request Rejected
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            The room admin has declined your request to join this session.
                        </p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-500">
                            You may try joining a different room or create your own.
                        </p>
                    </div>

                    {/* Go Home Button */}
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleGoHome}
                        isFullWidth
                    >
                        Return to Home
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default RejectedPage
