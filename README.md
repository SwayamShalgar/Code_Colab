# CodeOrBit - Real-Time Collaborative Coding Platform

<div align="center">

![CodeSync](https://img.shields.io/badge/CodeSync-Collaborative%20IDE-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-3178c6?logo=typescript)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7.3-010101?logo=socket.io)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)

**A powerful real-time collaborative coding platform with video calling, screen sharing, and AI assistance.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Usage Guide](#-usage-guide) • [API Reference](#-api-reference) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [Usage Guide](#-usage-guide)
  - [Creating/Joining a Room](#1-creatingjoining-a-room)
  - [Collaborative Coding](#2-collaborative-coding)
  - [Video Calls & Screen Sharing](#3-video-calls--screen-sharing)
  - [Using AI Copilot](#4-using-ai-copilot)
  - [Running Code](#5-running-code)
  - [Drawing Board](#6-drawing-board)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [API Reference](#-api-reference)
- [Dummy Users](#-dummy-users)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**CodeSync** is a feature-rich, real-time collaborative coding platform that enables multiple developers to work together seamlessly. Built with modern web technologies, it offers an IDE-like experience in the browser with live code synchronization, video communication, AI assistance, and much more.

### Key Highlights

- 🚀 **Real-time Collaboration** - Multiple users can code together with instant synchronization
- 📹 **Video & Audio Calling** - Built-in WebRTC video conferencing and screen sharing
- 🤖 **AI Copilot** - Integrated AI assistance for code generation and explanations
- 🎨 **Collaborative Drawing** - Whiteboard for brainstorming and system design
- 🏃 **Code Execution** - Run code in multiple languages directly in the browser
- 💬 **Live Chat** - Real-time messaging with Markdown support
- 🔐 **Admin Controls** - Room admission system with admin privileges
- 🎯 **Task Management** - Built-in task tracking for project organization
- 🌓 **Dark Mode** - Beautiful dark/light theme support
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

---

## ✨ Features

### 1. **Real-Time Code Editor**
- **Syntax Highlighting** - Support for 150+ programming languages
- **Multiple Themes** - Choose from 30+ CodeMirror themes
- **Live Sync** - Instant code synchronization across all participants
- **Cursor Tracking** - See where other users are typing
- **Auto-save** - Never lose your work
- **Multi-file Support** - Create, edit, rename, and delete files and folders
- **File Tree Navigation** - Intuitive sidebar file explorer
- **Tab Management** - Multiple open files with tabs

### 2. **Collaboration Modes**
- **Collaborative Mode** - All users edit the same codebase in real-time
- **Individual Mode** - Each user has their own workspace while staying connected
- **Admin Controls** - First user becomes admin with admission privileges
- **User Management** - See online/offline status of all participants
- **Admission System** - Admin can accept/reject join requests

### 3. **Video & Audio Communication**
- **WebRTC Video Calls** - High-quality peer-to-peer video
- **Audio Communication** - Crystal clear voice chat
- **Screen Sharing** - Share your screen with multiple participants
- **Camera Controls** - Toggle camera on/off
- **Microphone Controls** - Mute/unmute microphone
- **Responsive Grid** - Adaptive video grid layout
- **Username Display** - See who's who in video calls

### 4. **AI Copilot Integration**
- **Code Generation** - Generate code from natural language descriptions
- **Code Explanation** - Get explanations for complex code
- **Bug Fixing** - AI-powered debugging assistance
- **Multiple Providers** - Support for Pollinations AI and custom endpoints
- **Markdown Rendering** - Beautiful formatted AI responses
- **Syntax Highlighting** - Code blocks with language-specific highlighting
- **Chat History** - Keep track of your AI conversations

### 5. **Code Execution**
- **Multi-Language Support** - Run code in 45+ programming languages
- **Piston API Integration** - Secure sandboxed code execution
- **Custom Input** - Provide stdin input to your programs
- **Real-time Output** - See execution results instantly
- **Error Handling** - Clear error messages and debugging info
- **Execution History** - Track your code runs

### 6. **Drawing & Whiteboard**
- **TLDraw Integration** - Professional drawing canvas
- **Real-time Sync** - Collaborative whiteboard drawing
- **Shape Tools** - Rectangles, circles, arrows, text, and more
- **Freehand Drawing** - Sketch and annotate freely
- **Persistent State** - Drawings saved throughout session
- **Export Options** - Save your diagrams

### 7. **Live Chat System**
- **Real-time Messaging** - Instant message delivery
- **Markdown Support** - Rich text formatting in messages
- **User Avatars** - Visual user identification
- **Timestamps** - Know when messages were sent
- **Notification Sounds** - Audio alerts for new messages
- **Message History** - Full conversation preserved

### 8. **Task Management**
- **Task Creation** - Add tasks when creating a room
- **Task Assignment** - Organize work among team members
- **Task Tracking** - Monitor progress and completion
- **Persistent Tasks** - Tasks persist for the entire session

### 9. **File Management**
- **Create Files/Folders** - Build complete project structures
- **Rename** - Update file and folder names
- **Delete** - Remove unwanted files and directories
- **Download** - Export individual files or entire project as ZIP
- **Upload** - Import files into your workspace
- **File Icons** - Visual file type indicators using vscode-icons

### 10. **User Experience**
- **Dark/Light Themes** - Toggle between themes
- **Fullscreen Mode** - Distraction-free coding
- **Toast Notifications** - Non-intrusive status updates
- **Keyboard Shortcuts** - Efficient workflow
- **Responsive Layout** - Adaptive UI for all screen sizes
- **Loading States** - Clear feedback during operations
- **Error Handling** - Graceful error recovery

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.2.0 |
| **TypeScript** | Type Safety | 5.4.5 |
| **Vite** | Build Tool | 6.2.2 |
| **TailwindCSS** | Styling | 3.4.1 |
| **CodeMirror 6** | Code Editor | 6.0.1 |
| **Socket.IO Client** | Real-time Communication | 4.7.3 |
| **React Router** | Routing | 6.22.3 |
| **TLDraw** | Drawing Canvas | 2.1.4 |
| **Axios** | HTTP Client | 1.8.2 |
| **React Icons** | Icon Library | 5.2.1 |
| **React Hot Toast** | Notifications | 2.4.1 |
| **React Markdown** | Markdown Rendering | 10.0.1 |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | - |
| **Express** | Web Framework | 4.21.2 |
| **Socket.IO** | WebSocket Server | 4.7.3 |
| **TypeScript** | Type Safety | 4.9.5 |
| **CORS** | Cross-Origin Resource Sharing | 2.8.5 |
| **Dotenv** | Environment Variables | 16.3.1 |

### External APIs
- **Piston API** - Code execution in 45+ languages
- **Pollinations AI** - AI-powered code assistance
- **Google STUN Servers** - WebRTC NAT traversal

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   React UI   │  │ CodeMirror   │  │   TLDraw     │     │
│  │  Components  │  │    Editor    │  │   Canvas     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Context Providers                        │  │
│  │  App │ Socket │ File │ Chat │ Media │ Copilot │...  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ WebSocket (Socket.IO)
                   │ WebRTC (Peer-to-Peer)
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                        Server Layer                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Socket.IO Event Handlers                    │  │
│  │  - User Management  - File Sync  - Media Signaling   │  │
│  │  - Chat Messages    - Drawing    - Admin Controls    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   User Map   │  │ Room Settings│  │ Pending Users│     │
│  │  (In-Memory) │  │  (In-Memory) │  │  (In-Memory) │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                   │
                   │ HTTP Requests
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                     External Services                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Piston API  │  │Pollinations  │  │ STUN Servers │     │
│  │(Code Runner) │  │  (AI Copilot)│  │   (WebRTC)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

#### 1. **Real-time Code Synchronization**
```
User A types code
    ↓
CodeMirror onChange event
    ↓
FILE_UPDATED event via Socket.IO
    ↓
Server broadcasts to room
    ↓
User B, C, D receive update
    ↓
CodeMirror updates display
```

#### 2. **WebRTC Video Call Establishment**
```
User A joins media
    ↓
MEDIA_JOIN event to server
    ↓
Server notifies all peers in room
    ↓
Each peer creates RTCPeerConnection
    ↓
SDP Offer/Answer exchange via Socket.IO
    ↓
ICE candidates exchanged
    ↓
Direct P2P connection established
    ↓
Video/Audio streams flow directly between peers
```

#### 3. **Admin Admission Flow**
```
New user joins room
    ↓
Check if room has users
    ↓
If first user → Auto-join as admin
    ↓
If has users → Add to pending queue
    ↓
Notify admin of join request
    ↓
Admin accepts/rejects
    ↓
If accepted → User joins room
If rejected → User sees rejection message
```

---

## 🚀 Getting Started

### Prerequisites

Before running CodeSync, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SwayamShalgar/Code_Colab.git
   cd Code_Colab
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running Locally

#### Development Mode

1. **Start the server** (Terminal 1)
   ```bash
   cd server
   npm run dev
   ```
   Server will start on `http://localhost:3000`

2. **Start the client** (Terminal 2)
   ```bash
   cd client
   npm run dev
   ```
   Client will start on `http://localhost:5173`

3. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

#### Production Mode

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Build the server**
   ```bash
   cd server
   npm run build
   ```

3. **Start the production server**
   ```bash
   cd server
   npm start
   ```

### Building for Production

#### Environment Variables

Create `.env` files in both client and server directories:

**Server `.env`:**
```env
PORT=3000
NODE_ENV=production
```

**Client `.env`:**
```env
VITE_BACKEND_URL=http://localhost:3000
```

#### Docker Deployment (Optional)

You can containerize both client and server for easy deployment:

```dockerfile
# Example Dockerfile for server
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000
```

---

## 📖 Usage Guide

### 1. Creating/Joining a Room

#### **Create a New Room**
1. Visit the homepage
2. Enter your **username** (will be visible to others)
3. Generate a unique **Room ID** or create a custom one
4. Choose **Collaboration Mode**:
   - ✅ **Collaborative** - Everyone edits the same code
   - ❌ **Individual** - Each user has their own workspace
5. (Optional) Add **Tasks** for the session
6. Click **Create Room**
7. You'll be the **admin** with special privileges

#### **Join an Existing Room**
1. Visit the homepage
2. Enter your **username**
3. Enter the **Room ID** shared by the room creator
4. Click **Join Room**
5. Wait for admin approval (you'll see a waiting screen)
6. Once accepted, you'll enter the collaborative workspace

### 2. Collaborative Coding

#### **File Management**
- **Create File**: Click + icon in sidebar → Enter filename with extension
- **Create Folder**: Click folder+ icon → Enter folder name
- **Rename**: Right-click file/folder → Select rename → Enter new name
- **Delete**: Right-click file/folder → Select delete → Confirm
- **Download**: Right-click → Download (or download entire project as ZIP)

#### **Code Editor Features**
- **Multiple Files**: Click tabs to switch between open files
- **Syntax Highlighting**: Auto-detected based on file extension
- **Theme Selection**: Settings panel → Choose from 30+ themes
- **Font Size**: Adjust in settings
- **See Others Typing**: User avatars show where others are editing
- **Auto-sync**: All changes sync in real-time (in collaborative mode)

#### **Collaboration Tips**
- Use **Chat** to communicate with team members
- Check **Users** panel to see who's online
- In **Individual Mode**, files don't sync (good for teaching/demos)
- In **Collaborative Mode**, be mindful of concurrent edits

### 3. Video Calls & Screen Sharing

#### **Starting a Video Call**
1. Click the **📹 Media** icon in the sidebar
2. Your browser will ask for camera/microphone permissions
3. Grant permissions to enable video/audio
4. Click **Join Media** button
5. Your video will appear, and you'll connect to other participants

#### **Media Controls**
- **🎥 Camera**: Toggle your video feed on/off
- **🎤 Microphone**: Mute/unmute your audio
- **🖥️ Screen Share**: Share your entire screen or specific window
  - Click to start sharing
  - Select window/screen to share
  - Click again to stop sharing
- **❌ Leave**: Disconnect from media session

#### **Features**
- **Multiple Participants**: Support for many simultaneous users
- **Grid Layout**: Automatically adjusts based on participant count
- **Screen Previews**: See everyone's shared screens separately
- **Username Labels**: Know who's who in the call
- **Audio-only Mode**: Turn off camera to save bandwidth

### 4. Using AI Copilot

#### **Accessing Copilot**
1. Click the **🤖 Copilot** icon in the sidebar
2. The AI assistant panel will open

#### **Features**
- **Code Generation**: "Create a React component for a login form"
- **Code Explanation**: "Explain what this function does"
- **Debugging Help**: "Why am I getting this error?"
- **Best Practices**: "How can I improve this code?"
- **Refactoring**: "Refactor this to use async/await"

#### **Usage Tips**
- Be specific in your prompts
- Provide context about your project
- Ask follow-up questions
- Copy generated code directly to editor
- Responses are formatted with syntax highlighting

### 5. Running Code

#### **Execute Your Code**
1. Click the **▶️ Run** icon in the sidebar
2. Select your programming language from dropdown
3. (Optional) Enter **stdin input** if your program needs it
4. Click **Run Code**
5. View output in the results panel

#### **Supported Languages** (45+)
- JavaScript, TypeScript, Python, Java, C, C++, C#
- Go, Rust, Ruby, PHP, Swift, Kotlin
- And many more via Piston API!

#### **Features**
- Real-time execution results
- Error messages with line numbers
- Execution time tracking
- Standard input support
- Multiple language versions

### 6. Drawing Board

#### **Collaborative Whiteboard**
1. Click the drawing toggle button (top toolbar)
2. Canvas switches from code editor to whiteboard
3. All participants see and can draw together

#### **Drawing Tools**
- **Select**: Move and resize shapes
- **Draw**: Freehand drawing
- **Rectangle**: Create boxes
- **Ellipse**: Create circles/ovals
- **Arrow**: Draw directional arrows
- **Text**: Add labels and notes
- **Sticky Notes**: Add colored notes

#### **Use Cases**
- System architecture diagrams
- Algorithm flowcharts
- UI/UX mockups
- Brainstorming sessions
- Code structure planning

---

## 📁 Project Structure

```
Code-Sync/
│
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   │   └── favicon/                 # Favicon files
│   ├── src/
│   │   ├── api/                     # API integration
│   │   │   ├── pistonApi.ts         # Code execution API
│   │   │   └── pollinationsApi.ts  # AI Copilot API
│   │   ├── assets/                  # Images, SVGs
│   │   ├── components/              # React components
│   │   │   ├── auth/                # Authentication components
│   │   │   │   └── LoginComponent.tsx
│   │   │   ├── chats/               # Chat feature
│   │   │   │   ├── ChatInput.tsx
│   │   │   │   └── ChatList.tsx
│   │   │   ├── common/              # Shared components
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── MediaControls.tsx
│   │   │   │   ├── ThemeToggle.tsx
│   │   │   │   ├── Users.tsx
│   │   │   │   └── VideoGrid.tsx
│   │   │   ├── connection/          # Connection states
│   │   │   │   ├── ConnectionStatusPage.tsx
│   │   │   │   ├── RejectedPage.tsx
│   │   │   │   └── WaitingForAdmission.tsx
│   │   │   ├── editor/              # Code editor
│   │   │   │   ├── Editor.tsx
│   │   │   │   ├── EditorComponent.tsx
│   │   │   │   └── FileTab.tsx
│   │   │   ├── files/               # File explorer
│   │   │   │   ├── FileStructureView.tsx
│   │   │   │   └── RenameView.tsx
│   │   │   ├── forms/               # Form components
│   │   │   │   └── FormComponent.tsx
│   │   │   ├── sidebar/             # Sidebar views
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── sidebar-views/   # Individual view panels
│   │   │   ├── toast/               # Toast notifications
│   │   │   │   └── Toast.tsx
│   │   │   ├── ui/                  # UI primitives
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── ...
│   │   │   └── workspace/           # Main workspace
│   │   │       └── index.tsx
│   │   ├── context/                 # React Context providers
│   │   │   ├── AppContext.tsx       # Global app state
│   │   │   ├── SocketContext.tsx    # Socket.IO connection
│   │   │   ├── FileContext.tsx      # File system state
│   │   │   ├── ChatContext.tsx      # Chat state
│   │   │   ├── MediaContext.tsx     # WebRTC media state
│   │   │   ├── CopilotContext.tsx   # AI assistant state
│   │   │   └── ...
│   │   ├── data/                    # Static data
│   │   │   └── dummyUsers.ts        # Demo user accounts
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useFullScreen.tsx
│   │   │   ├── useResponsive.tsx
│   │   │   └── ...
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage.tsx         # Landing/join page
│   │   │   └── EditorPage.tsx       # Main editor page
│   │   ├── resources/               # Fonts, themes
│   │   ├── styles/                  # Global styles
│   │   │   └── global.css
│   │   ├── types/                   # TypeScript types
│   │   │   ├── app.ts
│   │   │   ├── user.ts
│   │   │   ├── file.ts
│   │   │   ├── chat.ts
│   │   │   ├── media.ts
│   │   │   └── ...
│   │   ├── utils/                   # Utility functions
│   │   │   ├── file.ts
│   │   │   ├── formateDate.ts
│   │   │   └── ...
│   │   ├── App.tsx                  # Root component
│   │   └── main.tsx                 # Entry point
│   ├── index.html                   # HTML template
│   ├── package.json                 # Dependencies
│   ├── tsconfig.json                # TypeScript config
│   ├── vite.config.mts              # Vite config
│   └── tailwind.config.ts           # Tailwind config
│
├── server/                          # Backend Node.js server
│   ├── src/
│   │   ├── types/                   # TypeScript types
│   │   │   ├── socket.ts            # Socket event types
│   │   │   └── user.ts              # User types
│   │   └── server.ts                # Main server file
│   ├── public/
│   │   └── index.html               # Server landing page
│   ├── package.json                 # Dependencies
│   └── tsconfig.json                # TypeScript config
│
├── DUMMY_USERS.md                   # Demo user documentation
├── webrtc-debug-helper.html         # WebRTC debugging tool
└── README.md                        # This file
```

---

## ⚙️ Configuration

### Client Configuration

**File: `client/vite.config.mts`**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true
      }
    }
  }
})
```

### Server Configuration

**File: `server/src/server.ts`**

Key configurations:
- `PORT`: Server port (default: 3000)
- `maxHttpBufferSize`: Max Socket.IO message size (100MB)
- `pingTimeout`: Socket timeout (60 seconds)
- `cors`: CORS settings (allow all in dev, restrict in prod)

### Environment Variables

#### Client (`.env`)
```env
VITE_BACKEND_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

#### Server (`.env`)
```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

---

## 📡 API Reference

### Socket.IO Events

#### **User Management Events**

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `JOIN_REQUEST` | Client → Server | `{ roomId, username, isCollaborative, tasks }` | Request to join a room |
| `JOIN_ACCEPTED` | Server → Client | `{ user, users, tasks }` | Join request approved |
| `ADMISSION_REQUEST` | Server → Admin | `{ username, socketId }` | New user awaiting approval |
| `ADMISSION_RESPONSE` | Admin → Server | `{ socketId, username, accepted }` | Admin's decision |
| `USER_JOINED` | Server → Clients | `{ user }` | New user joined room |
| `USER_DISCONNECTED` | Server → Clients | `{ user }` | User left room |
| `USER_ONLINE` | Client ↔ Server | `{ socketId }` | User came online |
| `USER_OFFLINE` | Client ↔ Server | `{ socketId }` | User went offline |
| `USERNAME_EXISTS` | Server → Client | - | Username already taken |
| `USER_REJECTED` | Server → Client | - | Join request denied |
| `WAITING_FOR_ADMISSION` | Server → Client | - | Waiting for admin approval |

#### **File System Events**

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `FILE_CREATED` | Client ↔ Server | `{ parentDirId, newFile }` | New file created |
| `FILE_UPDATED` | Client ↔ Server | `{ fileId, newContent }` | File content changed |
| `FILE_RENAMED` | Client ↔ Server | `{ fileId, newName }` | File renamed |
| `FILE_DELETED` | Client ↔ Server | `{ fileId }` | File deleted |
| `DIRECTORY_CREATED` | Client ↔ Server | `{ parentDirId, newDirectory }` | New folder created |
| `DIRECTORY_UPDATED` | Client ↔ Server | `{ dirId, children }` | Folder contents changed |
| `DIRECTORY_RENAMED` | Client ↔ Server | `{ dirId, newName }` | Folder renamed |
| `DIRECTORY_DELETED` | Client ↔ Server | `{ dirId }` | Folder deleted |
| `SYNC_FILE_STRUCTURE` | Client ↔ Server | `{ fileStructure, openFiles, activeFile, socketId }` | Sync file system |

#### **Chat Events**

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `SEND_MESSAGE` | Client → Server | `{ message }` | Send chat message |
| `RECEIVE_MESSAGE` | Server → Clients | `{ message }` | Receive chat message |

#### **Editor Events**

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `TYPING_START` | Client → Server | `{ cursorPosition }` | User started typing |
| `TYPING_PAUSE` | Client → Server | - | User paused typing |

#### **Drawing Events**

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `REQUEST_DRAWING` | Client → Server | - | Request current drawing |
| `SYNC_DRAWING` | Server → Client | `{ drawingData, socketId }` | Sync drawing state |
| `DRAWING_UPDATE` | Client ↔ Server | `{ snapshot }` | Drawing changed |

#### **Media/WebRTC Events**

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `MEDIA_JOIN` | Client ↔ Server | `{ socketId, username }` | User joined media |
| `MEDIA_OFFER` | Client ↔ Server | `{ targetSocketId, offer, from }` | WebRTC SDP offer |
| `MEDIA_ANSWER` | Client ↔ Server | `{ targetSocketId, answer, from }` | WebRTC SDP answer |
| `MEDIA_ICE` | Client ↔ Server | `{ targetSocketId, candidate, from }` | ICE candidate |
| `MEDIA_LEAVE` | Client ↔ Server | `{ socketId }` | User left media |
| `TOGGLE_CAMERA` | Client ↔ Server | `{ socketId, enabled }` | Camera toggled |
| `TOGGLE_MIC` | Client ↔ Server | `{ socketId, enabled }` | Microphone toggled |
| `TOGGLE_SCREEN_SHARE` | Client ↔ Server | `{ socketId, enabled }` | Screen share toggled |

### REST APIs (External)

#### **Piston API** (Code Execution)
```typescript
POST https://emkc.org/api/v2/piston/execute
Content-Type: application/json

{
  "language": "python",
  "version": "3.10.0",
  "files": [{
    "name": "main.py",
    "content": "print('Hello World')"
  }],
  "stdin": ""
}
```

#### **Pollinations AI** (Copilot)
```typescript
POST https://text.pollinations.ai/
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "Generate a React component" }
  ],
  "model": "openai"
}
```

---

## 👥 Dummy Users

For testing and development, 20 pre-configured dummy users are available:

### Quick Test Credentials

| Role | Username | Password | Level |
|------|----------|----------|-------|
| Student | alice_dev | alice123 | Intermediate |
| Student | bob_coder | bob456 | Beginner |
| Instructor | charlie_pro | charlie789 | Expert |
| Admin | isaac_admin | isaac333 | Expert |

**Full List:** See [DUMMY_USERS.md](./DUMMY_USERS.md) for all 20 users with detailed profiles.

### Using Dummy Users

```typescript
import { authenticateUser } from '@/data/dummyUsers'

const user = authenticateUser('alice_dev', 'alice123')
if (user) {
  console.log(`Welcome ${user.fullName}!`)
  // User authenticated successfully
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Code_Colab.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable

4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues

### Development Guidelines

- Use TypeScript for type safety
- Follow React best practices
- Keep components small and focused
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Test coverage
- 🌍 Internationalization

---

## 📝 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgments

- **CodeMirror** - Powerful code editor component
- **TLDraw** - Beautiful drawing canvas
- **Socket.IO** - Real-time communication
- **Piston API** - Code execution service
- **Pollinations AI** - AI assistance
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI framework
- **Vite** - Next-generation build tool

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/SwayamShalgar/Code_Colab/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SwayamShalgar/Code_Colab/discussions)
- **Email**: [Your contact email]

---

## 🗺️ Roadmap

### Upcoming Features

- [ ] Persistent storage with database integration
- [ ] User authentication with OAuth
- [ ] Private rooms with password protection
- [ ] File version history and rollback
- [ ] Code review and commenting
- [ ] Plugin system for extensibility
- [ ] Mobile app (React Native)
- [ ] AI-powered code suggestions inline
- [ ] Recording and playback of coding sessions
- [ ] Integration with GitHub/GitLab
- [ ] Custom themes builder
- [ ] Collaborative debugging tools

---

<div align="center">

**Built with ❤️ by [Swayam Shalgar](https://github.com/SwayamShalgar)**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/SwayamShalgar/Code_Colab/issues) • [Request Feature](https://github.com/SwayamShalgar/Code_Colab/issues) • [View Demo](#)

</div>

