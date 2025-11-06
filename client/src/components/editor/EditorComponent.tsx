import { useFileSystem } from "@/context/FileContext"
import useResponsive from "@/hooks/useResponsive"
import cn from "classnames"
import Editor from "./Editor"
import FileTab from "./FileTab"

function EditorComponent() {
    const { openFiles } = useFileSystem()
    const { minHeightReached } = useResponsive()

    if (openFiles.length <= 0) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-white dark:bg-neutral-950 md:ml-[60px]">
                <div className="text-center space-y-3">
                    <h1 className="text-xl font-medium text-neutral-700 dark:text-neutral-300">
                        No file is currently open
                    </h1>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500">
                        Open a file from the file explorer to get started
                    </p>
                </div>
            </div>
        )
    }

    return (
        <main
            className={cn("flex w-full flex-col overflow-x-auto md:h-screen", {
                "h-[calc(100vh-50px)]": !minHeightReached,
                "h-full": minHeightReached,
            })}
        >
            <FileTab />
            <Editor />
        </main>
    )
}

export default EditorComponent
