import { ReactNode } from "react"
import { AppContextProvider } from "./AppContext.js"
import { ChatContextProvider } from "./ChatContext.jsx"
import { FileContextProvider } from "./FileContext.jsx"
import { RunCodeContextProvider } from "./RunCodeContext.jsx"
import { SettingContextProvider } from "./SettingContext.jsx"
import { SocketProvider } from "./SocketContext.jsx"
import { ViewContextProvider } from "./ViewContext.js"
import { CopilotContextProvider } from "./CopilotContext.js"
import { MediaProvider } from "./MediaContext.js"

function AppProvider({ children }: { children: ReactNode }) {
    return (
        <AppContextProvider>
            <SocketProvider>
                <MediaProvider>
                    <SettingContextProvider>
                        <ViewContextProvider>
                            <FileContextProvider>
                                <CopilotContextProvider>
                                    <RunCodeContextProvider>
                                        <ChatContextProvider>
                                            {children}
                                        </ChatContextProvider>
                                    </RunCodeContextProvider>
                                </CopilotContextProvider>
                            </FileContextProvider>
                        </ViewContextProvider>
                    </SettingContextProvider>
                </MediaProvider>
            </SocketProvider>
        </AppContextProvider>
    )
}

export default AppProvider
