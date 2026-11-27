import { useViews } from "@/context/ViewContext"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { ReactNode } from "react"
import Split from "react-split"

export default function SplitterComponent({
    children,
}: {
    children: ReactNode
}) {
    const { isSidebarOpen } = useViews()
    const { isMobile, width } = useWindowDimensions()

    let sizes = [35, 65]

    try {
        const saved = JSON.parse(
            localStorage.getItem("editorSizes") || "null",
        )

        if (
            Array.isArray(saved) &&
            saved.length === 2 &&
            saved.every(
                (value) =>
                    typeof value === "number" &&
                    Number.isFinite(value) &&
                    value > 0,
            ) &&
            Math.abs(saved[0] + saved[1] - 100) < 1
        ) {
            sizes = saved
        }
    } catch {
        // Use the default layout if storage is unavailable.
    }

    const closedWidth = (76 / Math.max(width, 1)) * 100

    const actualSizes = isMobile
        ? [0, 100]
        : isSidebarOpen
          ? sizes
          : [closedWidth, 100 - closedWidth]

    return (
        <Split
            sizes={actualSizes}
            minSize={
                isMobile
                    ? [0, 0]
                    : isSidebarOpen
                      ? [350, 300]
                      : [76, 0]
            }
            maxSize={
                isMobile
                    ? [0, Infinity]
                    : isSidebarOpen
                      ? [Infinity, Infinity]
                      : [76, Infinity]
            }
            gutterSize={isSidebarOpen && !isMobile ? 6 : 0}
            gutter={() => {
                const gutter = document.createElement("div")
                gutter.style.background = "#282e43"
                gutter.style.cursor = "col-resize"
                return gutter
            }}
            direction="horizontal"
            cursor="col-resize"
            onDragEnd={(newSizes) => {
                if (isMobile || !isSidebarOpen) return

                try {
                    localStorage.setItem(
                        "editorSizes",
                        JSON.stringify(newSizes),
                    )
                } catch {
                    // Resizing still works without persistence.
                }
            }}
            className="flex h-screen min-h-screen max-w-full overflow-hidden"
        >
            {children}
        </Split>
    )
}