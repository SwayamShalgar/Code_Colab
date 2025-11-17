import { useMedia } from "@/context/MediaContext"
import { useAppContext } from "@/context/AppContext"
import MediaControls from "@/components/common/MediaControls"
import VideoGrid from "@/components/common/VideoGrid"
import RemoteAudioManager from "@/components/common/RemoteAudioManager"
import { FaVideo, FaUsers } from "react-icons/fa"

function MediaView() {
    const { mediaState, remotePeers } = useMedia()
    const { currentUser, users } = useAppContext()

    const remoteParticipants = Array.from(remotePeers.values())

    // Helper to get username with fallback to users list
    const getDisplayName = (peer: typeof remoteParticipants[0]) => {
        if (peer.username) return peer.username
        const user = users.find(u => u.socketId === peer.socketId)
        return user?.username || `User ${peer.socketId.slice(0, 4)}`
    }

    return (
        <div className="flex h-full flex-col bg-dark text-light">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-darkHover p-4">
                <FaVideo size={20} />
                <h2 className="text-lg font-semibold">Media & Video</h2>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Media Controls Section */}
                <div className="border-b border-darkHover p-4">
                    <MediaControls />
                </div>

                {/* Status Section */}
                {mediaState.isInMediaSession ? (
                    <>
                        {/* Participants Info */}
                        <div className="border-b border-darkHover p-4">
                            <div className="flex items-center gap-2 text-sm">
                                <FaUsers size={16} />
                                <span className="font-medium">
                                    {remoteParticipants.length + 1} Participant{remoteParticipants.length !== 0 ? 's' : ''}
                                </span>
                            </div>
                            <div className="mt-2 space-y-1 text-xs text-gray-400">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    <span>{currentUser?.username || "You"} (You)</span>
                                </div>
                                {remoteParticipants.map((peer) => (
                                    <div key={peer.socketId} className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span>{getDisplayName(peer)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Video Grid */}
                        <div className="flex-1 overflow-hidden p-2">
                            <div className="h-full rounded-lg overflow-hidden border border-darkHover">
                                <VideoGrid />
                            </div>
                        </div>

                        {/* Media State Info */}
                        <div className="border-t border-darkHover p-4">
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className={`rounded px-2 py-1 ${mediaState.isCameraOn ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                                    Camera {mediaState.isCameraOn ? 'On' : 'Off'}
                                </span>
                                <span className={`rounded px-2 py-1 ${mediaState.isMicOn ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                                    Mic {mediaState.isMicOn ? 'On' : 'Off'}
                                </span>
                                {mediaState.isScreenSharing && (
                                    <span className="rounded bg-blue-600/20 px-2 py-1 text-blue-400">
                                        Screen Sharing
                                    </span>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-700/50">
                            <FaVideo size={32} className="text-gray-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium">Start a Video Call</h3>
                        <p className="mb-6 text-sm text-gray-400">
                            Connect with your team members using video, audio, and screen sharing
                        </p>
                        <div className="w-full max-w-xs">
                            <MediaControls />
                        </div>
                        <div className="mt-6 space-y-2 text-xs text-gray-500">
                            <p>• Camera and microphone access required</p>
                            <p>• High-quality peer-to-peer connections</p>
                            <p>• Share your screen anytime</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Audio Manager (invisible) */}
            <RemoteAudioManager />
        </div>
    )
}

export default MediaView
