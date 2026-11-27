import { useFileSystem } from "@/context/FileContext"
import { useViews } from "@/context/ViewContext"
import useResponsive from "@/hooks/useResponsive"
import { VIEWS } from "@/types/view"
import Editor from "./Editor"
import FileTab from "./FileTab"

function EditorComponent() {
    const { openFiles } = useFileSystem()
    const { setActiveView, setIsSidebarOpen } = useViews()
    const { minHeightReached } = useResponsive()

    if (openFiles.length === 0) {
        return (
            <div className="orbit-empty">
                <span
                    className="orbit-empty-symbol"
                    aria-hidden="true"
                >
                    &lt;/&gt;
                </span>

                <p className="orbit-eyebrow">
                    CodeOrbit workspace
                </p>

                <h1>A fresh start.</h1>

                <p>
                    Open a file or create one in Files to start coding.
                </p>

                <button
                    type="button"
                    className="orbit-primary"
                    onClick={() => {
                        setActiveView(VIEWS.FILES)
                        setIsSidebarOpen(true)
                    }}
                >
                    Open files
                </button>
            </div>
        )
    }

    return (
        <main
            className={`flex w-full flex-col overflow-x-auto md:h-screen ${
                minHeightReached
                    ? "h-full"
                    : "h-[calc(100vh-50px)]"
            }`}
        >
            <FileTab />
            <Editor />
        </main>
    )
}

export default EditorComponent