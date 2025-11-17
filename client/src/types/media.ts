export interface MediaState {
    isCameraOn: boolean
    isMicOn: boolean
    isScreenSharing: boolean
    isInMediaSession: boolean
}

export interface RemotePeer {
    socketId: string
    username?: string
    stream?: MediaStream
    screenStream?: MediaStream
    peerConnection?: RTCPeerConnection
    isCameraOn?: boolean
    isMicOn?: boolean
    isScreenSharing?: boolean
}

export interface MediaContextType {
    // Local media state
    localStream: MediaStream | null
    screenStream: MediaStream | null
    mediaState: MediaState
    
    // Remote peers
    remotePeers: Map<string, RemotePeer>
    
    // Actions
    joinMedia: () => Promise<void>
    leaveMedia: () => void
    toggleCamera: () => Promise<void>
    toggleMic: () => void
    toggleScreenShare: () => Promise<void>
}
