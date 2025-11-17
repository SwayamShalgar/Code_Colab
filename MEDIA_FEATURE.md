# Video, Audio, and Screen Sharing Feature

## Overview
This collaborative coding platform now supports real-time video, audio, and screen sharing using WebRTC technology. Users can see and hear each other while working together on code. The media features are accessible through a dedicated **Media** tab in the sidebar.

## Features

### 1. **Video Calling**
- Start/stop your camera
- See all participants in a responsive grid layout
- Visual indicators when camera is off (shows user initials)

### 2. **Audio Communication**
- Mute/unmute your microphone
- Automatic audio playback from remote participants
- Visual mute indicators on video tiles

### 3. **Screen Sharing**
- Share your entire screen or specific application window
- Screen appears in the video grid
- Visual indicator showing who is screen sharing

## How to Use

### Accessing Media Controls
1. After joining a code collaboration room, click the **Video icon** (📹) in the left sidebar
2. The Media tab will open showing the video call interface

### Joining a Media Session
1. In the Media tab, click the **"Join Video Call"** button
2. Grant browser permissions for camera and microphone when prompted
3. Your video feed will appear along with any other participants already in the call

### Controls

The media control bar appears at the top of the Media tab:

- **Camera Button** (Gray/Red): Toggle your camera on/off
  - Gray = Camera is on
  - Red = Camera is off

- **Microphone Button** (Gray/Red): Toggle your microphone on/off
  - Gray = Mic is on
  - Red = Mic is muted

- **Screen Share Button** (Gray/Blue): Start/stop screen sharing
  - Gray = Not sharing
  - Blue = Currently sharing your screen

- **Leave Button** (Red): End the video call and disconnect from media session

### Participants List
- View all active participants in the media session
- Green indicators show who is currently connected
- See real-time status updates

### Video Grid
- The video grid automatically adjusts based on the number of participants
- Remote participants' names appear on their video tiles
- Muted participants show a red microphone icon
- Screen shares appear in the grid alongside participant videos

### Media State Indicators
- At the bottom of the Media tab, see your current media state:
  - Camera status (On/Off)
  - Microphone status (On/Off)
  - Screen sharing status (if active)

## Technical Details

### Architecture
- **WebRTC**: Peer-to-peer connections for video/audio streaming
- **Signaling Server**: Socket.IO server handles connection negotiation
- **STUN Servers**: Google's public STUN servers for NAT traversal

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 11+)

### Required Permissions
- Camera access
- Microphone access
- Screen capture (for screen sharing)

### Network Requirements
- STUN servers are used for NAT traversal (publicly accessible)
- For restrictive networks, you may need TURN servers (not included by default)

## Components

### Client-Side
- **MediaContext**: Manages WebRTC connections, local streams, and peer state
- **MediaView**: Dedicated sidebar view for all media features
- **MediaControls**: UI controls for camera/mic/screen/leave
- **VideoGrid**: Displays local and remote video streams
- **RemoteAudioManager**: Handles audio playback from remote peers

### Server-Side
- **Media Socket Events**: Forwards signaling messages (offers, answers, ICE candidates)
- **Room Management**: Broadcasts media join/leave events to room participants

## File Structure

```
client/src/
├── context/
│   └── MediaContext.tsx          # WebRTC logic and state management
├── components/
│   ├── common/
│   │   ├── MediaControls.tsx     # Control buttons UI
│   │   ├── VideoGrid.tsx         # Video display grid
│   │   └── RemoteAudioManager.tsx # Audio playback handler
│   └── sidebar/
│       └── sidebar-views/
│           └── MediaView.tsx      # Main media tab interface
└── types/
    └── media.ts                   # TypeScript types

server/src/
├── server.ts                      # Socket event handlers
└── types/
    └── socket.ts                  # Socket event definitions
```

## Socket Events

### Signaling Events
- `MEDIA_JOIN`: User joins media session
- `MEDIA_OFFER`: SDP offer for peer connection
- `MEDIA_ANSWER`: SDP answer for peer connection
- `MEDIA_ICE`: ICE candidate exchange
- `MEDIA_LEAVE`: User leaves media session

### Toggle Events
- `TOGGLE_CAMERA`: Camera on/off notification
- `TOGGLE_MIC`: Microphone on/off notification
- `TOGGLE_SCREEN_SHARE`: Screen sharing on/off notification

## Troubleshooting

### Camera/Mic Not Working
1. Check browser permissions (click lock icon in address bar)
2. Ensure no other application is using the camera/mic
3. Try refreshing the page

### Can't See/Hear Remote Users
1. Check your network connection
2. Ensure the other user has joined the media session
3. Check browser console for WebRTC errors

### Screen Share Not Working
1. Grant screen capture permission when prompted
2. Some browsers require HTTPS for screen sharing
3. Select the correct window/screen in the browser dialog

### Poor Video Quality
- Check your internet connection speed
- Close unnecessary browser tabs
- Reduce number of participants or disable video

## Future Enhancements

Potential improvements:
- Virtual backgrounds
- Picture-in-picture mode
- Recording capabilities
- Noise cancellation
- Bandwidth optimization
- TURN server integration for better connectivity
- Grid layout customization
- Spotlight/focus mode for active speaker
