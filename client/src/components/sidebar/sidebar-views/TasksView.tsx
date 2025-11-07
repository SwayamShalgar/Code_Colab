import { useAppContext } from "@/context/AppContext"
import useResponsive from "@/hooks/useResponsive"
import { useState } from "react"

function TasksView() {
    const { currentUser } = useAppContext()
    const { viewHeight } = useResponsive()
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(0)

    if (!currentUser.tasks || currentUser.tasks.length === 0) {
        return (
            <div
                className="flex flex-col items-center justify-center gap-4 p-4"
                style={{ height: viewHeight }}
            >
                <div className="text-center">
                    <div className="mb-4 text-6xl">📋</div>
                    <h2 className="mb-2 text-xl font-semibold text-white">
                        No Tasks Assigned
                    </h2>
                    <p className="text-sm text-gray-400">
                        The admin hasn't set any coding tasks for this session yet.
                    </p>
                </div>
            </div>
        )
    }

    const selectedTask = currentUser.tasks[selectedTaskIndex]

    return (
        <div
            className="flex flex-col gap-4 overflow-y-auto p-4"
            style={{ height: viewHeight }}
        >
            <h1 className="view-title">Coding Tasks</h1>
            
            {/* Task Selector */}
            {currentUser.tasks.length > 1 && (
                <div className="rounded-lg bg-darkHover p-3">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Select Task
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {currentUser.tasks.map((task, index) => (
                            <button
                                key={task.id}
                                onClick={() => setSelectedTaskIndex(index)}
                                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                    selectedTaskIndex === index
                                        ? "bg-primary text-black"
                                        : "bg-gray-700 text-white hover:bg-gray-600"
                                }`}
                            >
                                Task {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Task Title */}
            <div className="rounded-lg bg-darkHover p-4">
                <div className="mb-1 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-primary">
                        {selectedTask.title}
                    </h2>
                    {currentUser.tasks.length > 1 && (
                        <span className="text-xs text-gray-400">
                            Task {selectedTaskIndex + 1} of {currentUser.tasks.length}
                        </span>
                    )}
                </div>
            </div>

            {/* Task Description */}
            <div className="rounded-lg bg-darkHover p-4">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                    Description
                </h3>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-200">
                    {selectedTask.description}
                </p>
            </div>

            {/* Test Cases */}
            {selectedTask.testCases.length > 0 && (
                <div className="rounded-lg bg-darkHover p-4">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                        Test Cases ({selectedTask.testCases.length})
                    </h3>
                    <div className="space-y-3">
                        {selectedTask.testCases.map((testCase, index) => (
                            <div
                                key={index}
                                className="rounded-md border border-gray-600 bg-dark p-3"
                            >
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-gray-400">
                                        Test Case {index + 1}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="mb-1 flex items-center gap-2">
                                            <span className="text-xs font-medium text-blue-400">
                                                Input:
                                            </span>
                                        </div>
                                        <pre className="overflow-x-auto rounded bg-gray-900 p-2 text-xs text-gray-300">
                                            {testCase.input}
                                        </pre>
                                    </div>
                                    <div>
                                        <div className="mb-1 flex items-center gap-2">
                                            <span className="text-xs font-medium text-green-400">
                                                Expected Output:
                                            </span>
                                        </div>
                                        <pre className="overflow-x-auto rounded bg-gray-900 p-2 text-xs text-gray-300">
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
    )
}

export default TasksView
