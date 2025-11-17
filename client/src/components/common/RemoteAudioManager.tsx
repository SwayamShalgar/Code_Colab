import { useMedia } from "@/context/MediaContext"
import { useEffect, useRef } from "react"

/**
 * RemoteAudioManager component handles playing audio from remote peers.
 * It creates hidden audio elements for each remote peer stream.
 */
function RemoteAudioManager() {
    const { remotePeers } = useMedia()
    const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map())

    useEffect(() => {
        const currentAudioElements = audioElementsRef.current

        // Add/update audio elements for each remote peer
        remotePeers.forEach((peer, socketId) => {
            if (peer.stream) {
                let audioElement = currentAudioElements.get(socketId)
                
                if (!audioElement) {
                    // Create new audio element
                    audioElement = document.createElement("audio")
                    audioElement.autoplay = true
                    currentAudioElements.set(socketId, audioElement)
                }

                // Update the audio stream
                if (audioElement.srcObject !== peer.stream) {
                    audioElement.srcObject = peer.stream
                }
            }
        })

        // Remove audio elements for peers that left
        currentAudioElements.forEach((audioElement, socketId) => {
            if (!remotePeers.has(socketId)) {
                audioElement.pause()
                audioElement.srcObject = null
                currentAudioElements.delete(socketId)
            }
        })

        // Cleanup on unmount
        return () => {
            currentAudioElements.forEach((audioElement) => {
                audioElement.pause()
                audioElement.srcObject = null
            })
            currentAudioElements.clear()
        }
    }, [remotePeers])

    // This component doesn't render anything visible
    return null
}

export default RemoteAudioManager
