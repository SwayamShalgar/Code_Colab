import { useAppContext } from "@/context/AppContext"
import { useState } from "react"

export function TaskPanel() {
    const { currentUser } = useAppContext()
    const [isExpanded, setIsExpanded] = useState(true)

    // This component is deprecated - tasks are now shown in TasksView sidebar
    if (!currentUser.tasks || currentUser.tasks.length === 0) return null

    const firstTask = currentUser.tasks[0]
    const { title, description, testCases } = firstTask

    return (
        <div className="border-b border-gray-700 bg-gray-900">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-800"
            >
                <div className="flex items-center gap-2">
                    <span className="text-lg">📋</span>
                    <h2 className="font-semibold text-white">Coding Task</h2>
                </div>
                <span className="text-gray-400">
                    {isExpanded ? "▼" : "▶"}
                </span>
            </button>
            
            {isExpanded && (
                <div className="border-t border-gray-700 bg-gray-800 p-4">
                    <h3 className="mb-2 text-lg font-bold text-primary">
                        {title}
                    </h3>
                    <p className="mb-4 whitespace-pre-wrap text-sm text-gray-300">
                        {description}
                    </p>
                    
                    {testCases.length > 0 && (
                        <div>
                            <h4 className="mb-2 font-semibold text-white">
                                Test Cases:
                            </h4>
                            <div className="space-y-3">
                                {testCases.map((testCase, index) => (
                                    <div
                                        key={index}
                                        className="rounded-md border border-gray-600 bg-gray-900 p-3"
                                    >
                                        <div className="mb-2 text-xs font-semibold text-gray-400">
                                            Test Case {index + 1}
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div>
                                                <span className="font-medium text-blue-400">
                                                    Input:
                                                </span>
                                                <pre className="mt-1 rounded bg-gray-950 p-2 text-gray-300">
                                                    {testCase.input}
                                                </pre>
                                            </div>
                                            <div>
                                                <span className="font-medium text-green-400">
                                                    Expected Output:
                                                </span>
                                                <pre className="mt-1 rounded bg-gray-950 p-2 text-gray-300">
                                                    {testCase.expectedOutput}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
