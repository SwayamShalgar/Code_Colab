import { MediaContextType, MediaState, RemotePeer } from "@/types/media"
import { SocketEvent } from "@/types/socket"
import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react"
import { toast } from "react-hot-toast"
import { useSocket } from "./SocketContext"
import { useAppContext } from "./AppContext"

const MediaContext = createContext<MediaContextType | null>(null)

export const useMedia = (): MediaContextType => {
    const context = useContext(MediaContext)
    if (!context) {
        throw new Error("useMedia must be used within a MediaProvider")
    }
    return context
}

// ICE servers configuration (using free STUN servers)
const ICE_SERVERS: RTCConfiguration = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
    ],
}

export const MediaProvider = ({ children }: { children: ReactNode }) => {
    const { socket } = useSocket()
    const { users } = useAppContext()
    
    const [localStream, setLocalStream] = useState<MediaStream | null>(null)
    const [screenStream, setScreenStream] = useState<MediaStream | null>(null)
    const [mediaState, setMediaState] = useState<MediaState>({
        isCameraOn: false,
        isMicOn: false,
        isScreenSharing: false,
        isInMediaSession: false,
    })
    
    const [remotePeers, setRemotePeers] = useState<Map<string, RemotePeer>>(new Map())
    const remotePeersRef = useRef<Map<string, RemotePeer>>(new Map())

    // Keep ref in sync with state
    useEffect(() => {
        remotePeersRef.current = remotePeers
    }, [remotePeers])

    // Helper function to get username from users list
    const getUsernameBySocketId = useCallback((socketId: string): string | undefined => {
        const user = users.find(u => u.socketId === socketId)
        return user?.username
    }, [users])

    // Create peer connection for a remote peer
    const createPeerConnection = useCallback((socketId: string): RTCPeerConnection => {
        const pc = new RTCPeerConnection(ICE_SERVERS)

        // Add local tracks to peer connection (camera/mic)
        if (localStream) {
            localStream.getTracks().forEach((track) => {
                pc.addTrack(track, localStream)
            })
        }

        // Add screen share tracks if screen sharing is active
        if (screenStream) {
            screenStream.getTracks().forEach((track) => {
                pc.addTrack(track, screenStream)
            })
        }

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit(SocketEvent.MEDIA_ICE, {
                    targetSocketId: socketId,
                    candidate: event.candidate,
                })
            }
        }

        // Handle incoming remote stream
        pc.ontrack = (event) => {
            console.log("Received track:", event.track.kind, "from stream:", event.streams[0].id)
            
            setRemotePeers((prev) => {
                const updated = new Map(prev)
                const peer = updated.get(socketId) || { socketId }
                
                // Check if this is a screen share stream (has only video track, no audio)
                const incomingStream = event.streams[0]
                const videoTracks = incomingStream.getVideoTracks()
                const audioTracks = incomingStream.getAudioTracks()
                
                // If stream has video but no audio, likely a screen share
                // Or if the track label indicates screen share
                const isScreenShare = videoTracks.length > 0 && audioTracks.length === 0
                
                if (isScreenShare && event.track.kind === 'video') {
                    // This is a screen share stream
                    peer.screenStream = incomingStream
                } else {
                    // This is a regular camera/mic stream
                    if (!peer.stream) {
                        peer.stream = incomingStream
                    } else {
                        // Update existing stream
                        peer.stream = incomingStream
                    }
                }
                
                updated.set(socketId, peer)
                return updated
            })
        }

        // Handle connection state changes
        pc.onconnectionstatechange = () => {
            if (pc.connectionState === "failed" || pc.connectionState === "disconnected") {
                console.log(`Peer connection ${socketId} ${pc.connectionState}`)
            }
        }

        return pc
    }, [localStream, screenStream, socket])

    // Join media session
    const joinMedia = useCallback(async () => {
        try {
            // Get user media (camera + mic)
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            })

            setLocalStream(stream)
            setMediaState((prev) => ({
                ...prev,
                isCameraOn: true,
                isMicOn: true,
                isInMediaSession: true,
            }))

            // Notify server that we joined media
            socket.emit(SocketEvent.MEDIA_JOIN)
            
            toast.success("Joined media session")
        } catch (error) {
            console.error("Error accessing media devices:", error)
            toast.error("Failed to access camera/microphone")
        }
    }, [socket])

    // Leave media session
    const leaveMedia = useCallback(() => {
        // Stop all local tracks
        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop())
            setLocalStream(null)
        }

        if (screenStream) {
            screenStream.getTracks().forEach((track) => track.stop())
            setScreenStream(null)
        }

        // Close all peer connections
        remotePeersRef.current.forEach((peer) => {
            if (peer.peerConnection) {
                peer.peerConnection.close()
            }
        })

        setRemotePeers(new Map())
        setMediaState({
            isCameraOn: false,
            isMicOn: false,
            isScreenSharing: false,
            isInMediaSession: false,
        })

        // Notify server
        socket.emit(SocketEvent.MEDIA_LEAVE)
        
        toast.success("Left media session")
    }, [localStream, screenStream, socket])

    // Toggle camera
    const toggleCamera = useCallback(async () => {
        if (!mediaState.isInMediaSession) {
            toast.error("Join media session first")
            return
        }

        if (mediaState.isCameraOn) {
            // Turn off camera
            const videoTrack = localStream?.getVideoTracks()[0]
            if (videoTrack) {
                videoTrack.stop()
                localStream?.removeTrack(videoTrack)
            }
            setMediaState((prev) => ({ ...prev, isCameraOn: false }))
            socket.emit(SocketEvent.TOGGLE_CAMERA, { enabled: false })
        } else {
            // Turn on camera
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true })
                const videoTrack = stream.getVideoTracks()[0]
                
                if (localStream) {
                    localStream.addTrack(videoTrack)
                    
                    // Add track to all peer connections
                    remotePeersRef.current.forEach((peer) => {
                        if (peer.peerConnection && localStream) {
                            const sender = peer.peerConnection.getSenders().find(s => s.track?.kind === 'video')
                            if (sender) {
                                sender.replaceTrack(videoTrack)
                            } else {
                                peer.peerConnection.addTrack(videoTrack, localStream)
                            }
                        }
                    })
                }
                
                setMediaState((prev) => ({ ...prev, isCameraOn: true }))
                socket.emit(SocketEvent.TOGGLE_CAMERA, { enabled: true })
            } catch (error) {
                console.error("Error enabling camera:", error)
                toast.error("Failed to enable camera")
            }
        }
    }, [localStream, mediaState.isInMediaSession, mediaState.isCameraOn, socket])

    // Toggle microphone
    const toggleMic = useCallback(() => {
        if (!mediaState.isInMediaSession) {
            toast.error("Join media session first")
            return
        }

        const audioTrack = localStream?.getAudioTracks()[0]
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled
            setMediaState((prev) => ({ ...prev, isMicOn: audioTrack.enabled }))
            socket.emit(SocketEvent.TOGGLE_MIC, { enabled: audioTrack.enabled })
        }
    }, [localStream, mediaState.isInMediaSession, socket])

    // Toggle screen sharing
    const toggleScreenShare = useCallback(async () => {
        if (!mediaState.isInMediaSession) {
            toast.error("Join media session first")
            return
        }

        if (mediaState.isScreenSharing) {
            // Stop screen sharing
            if (screenStream) {
                screenStream.getTracks().forEach((track) => track.stop())
                
                // Remove screen tracks from all peer connections
                remotePeersRef.current.forEach((peer) => {
                    if (peer.peerConnection) {
                        const senders = peer.peerConnection.getSenders()
                        senders.forEach((sender) => {
                            if (sender.track && sender.track.kind === 'video' && screenStream.getVideoTracks().includes(sender.track)) {
                                peer.peerConnection!.removeTrack(sender)
                            }
                        })
                    }
                })
                
                setScreenStream(null)
            }
            setMediaState((prev) => ({ ...prev, isScreenSharing: false }))
            socket.emit(SocketEvent.TOGGLE_SCREEN_SHARE, { enabled: false })
            toast.success("Screen sharing stopped")
        } else {
            // Start screen sharing
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                })

                setScreenStream(stream)
                setMediaState((prev) => ({ ...prev, isScreenSharing: true }))
                socket.emit(SocketEvent.TOGGLE_SCREEN_SHARE, { enabled: true })

                // Handle when user stops sharing via browser UI
                stream.getVideoTracks()[0].onended = () => {
                    // Remove screen tracks from all peer connections
                    remotePeersRef.current.forEach((peer) => {
                        if (peer.peerConnection) {
                            const senders = peer.peerConnection.getSenders()
                            senders.forEach((sender) => {
                                if (sender.track && sender.track.kind === 'video' && stream.getVideoTracks().includes(sender.track)) {
                                    peer.peerConnection!.removeTrack(sender)
                                }
                            })
                        }
                    })
                    
                    setScreenStream(null)
                    setMediaState((prev) => ({ ...prev, isScreenSharing: false }))
                    socket.emit(SocketEvent.TOGGLE_SCREEN_SHARE, { enabled: false })
                    toast.success("Screen sharing stopped")
                }

                // Add screen track to all peer connections
                const screenTrack = stream.getVideoTracks()[0]
                remotePeersRef.current.forEach(async (peer) => {
                    if (peer.peerConnection) {
                        // Add the screen track
                        peer.peerConnection.addTrack(screenTrack, stream)
                        
                        // Create and send new offer to update the connection
                        try {
                            const offer = await peer.peerConnection.createOffer()
                            await peer.peerConnection.setLocalDescription(offer)
                            socket.emit(SocketEvent.MEDIA_OFFER, {
                                targetSocketId: peer.socketId,
                                offer,
                            })
                        } catch (error) {
                            console.error("Error renegotiating after screen share:", error)
                        }
                    }
                })
                
                toast.success("Screen sharing started")
            } catch (error) {
                console.error("Error sharing screen:", error)
                toast.error("Failed to share screen")
            }
        }
    }, [mediaState.isInMediaSession, mediaState.isScreenSharing, screenStream, socket])

    // Socket event handlers
    useEffect(() => {
        // When a new peer joins media
        const handleMediaJoin = async ({ socketId, username }: { socketId: string; username?: string }) => {
            if (socketId === socket.id || !mediaState.isInMediaSession) return

            // Get username from users list if not provided
            const displayName = username || getUsernameBySocketId(socketId)
            console.log("Peer joined media:", socketId, displayName)

            // Create peer connection
            const pc = createPeerConnection(socketId)
            
            setRemotePeers((prev) => {
                const updated = new Map(prev)
                updated.set(socketId, {
                    socketId,
                    username: displayName,
                    peerConnection: pc,
                })
                return updated
            })

            // Create and send offer
            try {
                const offer = await pc.createOffer()
                await pc.setLocalDescription(offer)
                
                socket.emit(SocketEvent.MEDIA_OFFER, {
                    targetSocketId: socketId,
                    offer,
                })
            } catch (error) {
                console.error("Error creating offer:", error)
            }
        }

        // When receiving an offer from a peer
        const handleMediaOffer = async ({ from, offer }: { from: string; offer: RTCSessionDescriptionInit }) => {
            if (!mediaState.isInMediaSession) return

            console.log("Received offer from:", from)

            // Create peer connection if doesn't exist
            let peer = remotePeersRef.current.get(from)
            if (!peer) {
                const pc = createPeerConnection(from)
                const displayName = getUsernameBySocketId(from)
                peer = { socketId: from, username: displayName, peerConnection: pc }
                
                setRemotePeers((prev) => {
                    const updated = new Map(prev)
                    updated.set(from, peer!)
                    return updated
                })
            }

            try {
                await peer.peerConnection!.setRemoteDescription(new RTCSessionDescription(offer))
                const answer = await peer.peerConnection!.createAnswer()
                await peer.peerConnection!.setLocalDescription(answer)
                
                socket.emit(SocketEvent.MEDIA_ANSWER, {
                    targetSocketId: from,
                    answer,
                })
            } catch (error) {
                console.error("Error handling offer:", error)
            }
        }

        // When receiving an answer from a peer
        const handleMediaAnswer = async ({ from, answer }: { from: string; answer: RTCSessionDescriptionInit }) => {
            console.log("Received answer from:", from)

            const peer = remotePeersRef.current.get(from)
            if (peer?.peerConnection) {
                try {
                    await peer.peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
                } catch (error) {
                    console.error("Error handling answer:", error)
                }
            }
        }

        // When receiving ICE candidate from a peer
        const handleMediaICE = async ({ from, candidate }: { from: string; candidate: RTCIceCandidateInit }) => {
            const peer = remotePeersRef.current.get(from)
            if (peer?.peerConnection) {
                try {
                    await peer.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
                } catch (error) {
                    console.error("Error adding ICE candidate:", error)
                }
            }
        }

        // When a peer leaves media
        const handleMediaLeave = ({ socketId }: { socketId: string }) => {
            console.log("Peer left media:", socketId)
            
            const peer = remotePeersRef.current.get(socketId)
            if (peer?.peerConnection) {
                peer.peerConnection.close()
            }

            setRemotePeers((prev) => {
                const updated = new Map(prev)
                updated.delete(socketId)
                return updated
            })
        }

        // Handle toggle events from remote peers
        const handleToggleCamera = ({ socketId, enabled }: { socketId: string; enabled: boolean }) => {
            setRemotePeers((prev) => {
                const updated = new Map(prev)
                const peer = updated.get(socketId)
                if (peer) {
                    peer.isCameraOn = enabled
                    updated.set(socketId, peer)
                }
                return updated
            })
        }

        const handleToggleMic = ({ socketId, enabled }: { socketId: string; enabled: boolean }) => {
            setRemotePeers((prev) => {
                const updated = new Map(prev)
                const peer = updated.get(socketId)
                if (peer) {
                    peer.isMicOn = enabled
                    updated.set(socketId, peer)
                }
                return updated
            })
        }

        const handleToggleScreenShare = ({ socketId, enabled }: { socketId: string; enabled: boolean }) => {
            setRemotePeers((prev) => {
                const updated = new Map(prev)
                const peer = updated.get(socketId)
                if (peer) {
                    peer.isScreenSharing = enabled
                    updated.set(socketId, peer)
                }
                return updated
            })
        }

        socket.on(SocketEvent.MEDIA_JOIN, handleMediaJoin)
        socket.on(SocketEvent.MEDIA_OFFER, handleMediaOffer)
        socket.on(SocketEvent.MEDIA_ANSWER, handleMediaAnswer)
        socket.on(SocketEvent.MEDIA_ICE, handleMediaICE)
        socket.on(SocketEvent.MEDIA_LEAVE, handleMediaLeave)
        socket.on(SocketEvent.TOGGLE_CAMERA, handleToggleCamera)
        socket.on(SocketEvent.TOGGLE_MIC, handleToggleMic)
        socket.on(SocketEvent.TOGGLE_SCREEN_SHARE, handleToggleScreenShare)

        return () => {
            socket.off(SocketEvent.MEDIA_JOIN, handleMediaJoin)
            socket.off(SocketEvent.MEDIA_OFFER, handleMediaOffer)
            socket.off(SocketEvent.MEDIA_ANSWER, handleMediaAnswer)
            socket.off(SocketEvent.MEDIA_ICE, handleMediaICE)
            socket.off(SocketEvent.MEDIA_LEAVE, handleMediaLeave)
            socket.off(SocketEvent.TOGGLE_CAMERA, handleToggleCamera)
            socket.off(SocketEvent.TOGGLE_MIC, handleToggleMic)
            socket.off(SocketEvent.TOGGLE_SCREEN_SHARE, handleToggleScreenShare)
        }
    }, [socket, mediaState.isInMediaSession, createPeerConnection, getUsernameBySocketId])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (localStream) {
                localStream.getTracks().forEach((track) => track.stop())
            }
            if (screenStream) {
                screenStream.getTracks().forEach((track) => track.stop())
            }
            remotePeersRef.current.forEach((peer) => {
                if (peer.peerConnection) {
                    peer.peerConnection.close()
                }
            })
        }
    }, [])

    const value: MediaContextType = {
        localStream,
        screenStream,
        mediaState,
        remotePeers,
        joinMedia,
        leaveMedia,
        toggleCamera,
        toggleMic,
        toggleScreenShare,
    }

    return (
        <MediaContext.Provider value={value}>
            {children}
        </MediaContext.Provider>
    )
}
