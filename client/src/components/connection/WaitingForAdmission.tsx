/**
 * WaitingForAdmission - Screen shown to users waiting for admin approval
 * 
 * Features:
 * - Loading animation
 * - Clear messaging
 * - Cancel option to go back
 */

import { Card } from "@/components/ui"
import { useNavigate } from "react-router-dom"
import { IoHourglassOutline, IoArrowBack } from "react-icons/io5"

const WaitingForAdmission = () => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate("/")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-primary-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900 p-4">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900/20 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 dark:bg-secondary-900/20 rounded-full blur-3xl opacity-50"></div>
            </div>

            <Card variant="elevated" className="w-full max-w-md relative z-10">
                <Card.Body className="space-y-6 text-center py-8">
                    {/* Animated Icon */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-400/20 dark:bg-primary-600/20 rounded-full animate-ping"></div>
                            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30">
                                <IoHourglassOutline className="text-4xl text-primary-600 dark:text-primary-400 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Title and Message */}
                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                            Waiting for Admission
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            The room admin has been notified of your request.
                        </p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-500">
                            Please wait while they review your join request...
                        </p>
                    </div>

                    {/* Loading Dots */}
                    <div className="flex justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"></div>
                    </div>

                    {/* Go Back Button */}
                    <button
                        onClick={handleGoBack}
                        className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
                    >
                        <IoArrowBack />
                        Go back to home
                    </button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default WaitingForAdmission
