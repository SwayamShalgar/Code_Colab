import { useMedia } from "@/context/MediaContext"
import { useAppContext } from "@/context/AppContext"
import { RemoteUser } from "@/types/user"
import { useEffect, useRef } from "react"
import { FaMicrophoneSlash, FaDesktop } from "react-icons/fa"

function VideoGrid() {
    const { localStream, screenStream, mediaState, remotePeers } = useMedia()
    const { currentUser, users } = useAppContext()
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const screenVideoRef = useRef<HTMLVideoElement>(null)

    // Set local video stream
    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream
        }
    }, [localStream])

    // Set screen share stream
    useEffect(() => {
        if (screenVideoRef.current && screenStream) {
            screenVideoRef.current.srcObject = screenStream
        }
    }, [screenStream])

    if (!mediaState.isInMediaSession) {
        return null
    }

    const remoteArray = Array.from(remotePeers.values())
    // Count remote screen shares
    const remoteScreenShares = remoteArray.filter(peer => peer.screenStream || peer.isScreenSharing)
    const totalVideos = 1 + remoteArray.length + (screenStream ? 1 : 0) + remoteScreenShares.length

    // Calculate grid layout
    const getGridClass = () => {
        if (totalVideos === 1) return "grid-cols-1"
        if (totalVideos === 2) return "grid-cols-2"
        if (totalVideos <= 4) return "grid-cols-2"
        if (totalVideos <= 6) return "grid-cols-3"
        return "grid-cols-3"
    }

    return (
        <div className="h-full w-full bg-gray-900 p-2">
            <div className={`grid h-full w-full gap-2 ${getGridClass()}`}>
                {/* Local Video */}
                <div className="relative overflow-hidden rounded-lg bg-gray-800">
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        playsInline
                        className={`h-full w-full object-cover ${!mediaState.isCameraOn ? "hidden" : ""}`}
                    />
                    {!mediaState.isCameraOn && (
                        <div className="flex h-full w-full items-center justify-center bg-gray-700">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-600 text-3xl font-bold text-white">
                                {currentUser?.username?.charAt(0).toUpperCase() || "Y"}
                            </div>
                        </div>
                    )}
                    <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded bg-black/60 px-2 py-1 text-sm text-white">
                        <span>{currentUser?.username || "You"} (You)</span>
                        {!mediaState.isMicOn && <FaMicrophoneSlash size={14} className="text-red-500" />}
                    </div>
                </div>

                {/* Screen Share */}
                {screenStream && (
                    <div className="relative overflow-hidden rounded-lg bg-gray-800">
                        <video
                            ref={screenVideoRef}
                            autoPlay
                            muted
                            playsInline
                            className="h-full w-full object-contain"
                        />
                        <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded bg-black/60 px-2 py-1 text-sm text-white">
                            <FaDesktop size={14} />
                            <span>Your Screen</span>
                        </div>
                    </div>
                )}

                {/* Remote Peers */}
                {remoteArray.map((peer) => (
                    <RemoteVideo key={peer.socketId} peer={peer} users={users} />
                ))}
                
                {/* Remote Screen Shares */}
                {remoteArray.map((peer) => (
                    peer.screenStream ? (
                        <RemoteScreenShare key={`${peer.socketId}-screen`} peer={peer} />
                    ) : null
                ))}
            </div>
        </div>
    )
}

// Component for remote screen share
function RemoteScreenShare({ peer }: { peer: { socketId: string; username?: string; screenStream?: MediaStream } }) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current && peer.screenStream) {
            videoRef.current.srcObject = peer.screenStream
        }
    }, [peer.screenStream])

    return (
        <div className="relative overflow-hidden rounded-lg bg-gray-800">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="h-full w-full object-contain"
            />
            <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded bg-black/60 px-2 py-1 text-sm text-white">
                <FaDesktop size={14} className="text-blue-400" />
                <span>{peer.username || "User"}'s Screen</span>
            </div>
        </div>
    )
}

// Component for each remote peer video
function RemoteVideo({ peer, users }: { 
    peer: { socketId: string; username?: string; stream?: MediaStream; isCameraOn?: boolean; isMicOn?: boolean; isScreenSharing?: boolean }
    users: RemoteUser[]
}) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current && peer.stream) {
            videoRef.current.srcObject = peer.stream
        }
    }, [peer.stream])

    const hasVideo = peer.isCameraOn !== false && peer.stream
    
    // Get display name with fallback to users list
    const getDisplayName = () => {
        if (peer.username) return peer.username
        const user = users.find(u => u.socketId === peer.socketId)
        return user?.username || `User ${peer.socketId.slice(0, 4)}`
    }
    
    const displayName = getDisplayName()

    return (
        <div className="relative overflow-hidden rounded-lg bg-gray-800">
            {hasVideo ? (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="h-full w-full object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-700">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-600 text-3xl font-bold text-white">
                        {displayName.charAt(0).toUpperCase()}
                    </div>
                </div>
            )}
            <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded bg-black/60 px-2 py-1 text-sm text-white">
                <span>{displayName}</span>
                {peer.isMicOn === false && <FaMicrophoneSlash size={14} className="text-red-500" />}
                {peer.isScreenSharing && <FaDesktop size={14} className="text-blue-400" />}
            </div>
        </div>
    )
}

export default VideoGrid
