import { useMedia } from "@/context/MediaContext"
import {
    FaVideo,
    FaVideoSlash,
    FaMicrophone,
    FaMicrophoneSlash,
    FaDesktop,
    FaPhoneSlash,
} from "react-icons/fa"
import { MdStopScreenShare } from "react-icons/md"

function MediaControls() {
    const {
        mediaState,
        joinMedia,
        leaveMedia,
        toggleCamera,
        toggleMic,
        toggleScreenShare,
    } = useMedia()

    const { isInMediaSession, isCameraOn, isMicOn, isScreenSharing } = mediaState

    if (!isInMediaSession) {
        return (
            <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <button
                    onClick={joinMedia}
                    className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                >
                    <FaVideo size={16} />
                    <span>Join Video Call</span>
                </button>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            {/* Camera Toggle */}
            <button
                onClick={toggleCamera}
                className={`rounded-md px-3 py-2 transition ${
                    isCameraOn
                        ? "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                        : "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                }`}
                title={isCameraOn ? "Turn off camera" : "Turn on camera"}
            >
                {isCameraOn ? <FaVideo size={16} /> : <FaVideoSlash size={16} />}
            </button>

            {/* Mic Toggle */}
            <button
                onClick={toggleMic}
                className={`rounded-md px-3 py-2 transition ${
                    isMicOn
                        ? "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                        : "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                }`}
                title={isMicOn ? "Mute microphone" : "Unmute microphone"}
            >
                {isMicOn ? <FaMicrophone size={16} /> : <FaMicrophoneSlash size={16} />}
            </button>

            {/* Screen Share Toggle */}
            <button
                onClick={toggleScreenShare}
                className={`rounded-md px-3 py-2 transition ${
                    isScreenSharing
                        ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                        : "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                }`}
                title={isScreenSharing ? "Stop sharing screen" : "Share screen"}
            >
                {isScreenSharing ? <MdStopScreenShare size={18} /> : <FaDesktop size={16} />}
            </button>

            {/* Leave Call */}
            <button
                onClick={leaveMedia}
                className="ml-2 rounded-md bg-red-600 px-3 py-2 text-white transition hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                title="Leave call"
            >
                <FaPhoneSlash size={16} />
            </button>
        </div>
    )
}

export default MediaControls
