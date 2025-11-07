import { useRunCode } from "@/context/RunCodeContext"
import { useAppContext } from "@/context/AppContext"
import useResponsive from "@/hooks/useResponsive"
import { ChangeEvent } from "react"
import toast from "react-hot-toast"
import { LuCopy } from "react-icons/lu"
import { PiCaretDownBold } from "react-icons/pi"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"

function RunView() {
    const { viewHeight } = useResponsive()
    const { currentUser } = useAppContext()
    const {
        setInput,
        output,
        isRunning,
        supportedLanguages,
        selectedLanguage,
        setSelectedLanguage,
        runCode,
        runTestCases,
        testResults,
        isTestMode,
        setIsTestMode,
        selectedTaskIndex,
        setSelectedTaskIndex,
    } = useRunCode()

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = JSON.parse(e.target.value)
        setSelectedLanguage(lang)
    }

    const copyOutput = () => {
        navigator.clipboard.writeText(output)
        toast.success("Output copied to clipboard")
    }

    const hasTasks = currentUser.tasks && currentUser.tasks.length > 0
    const hasTestCases = hasTasks && currentUser.tasks![selectedTaskIndex]?.testCases.length > 0

    const handleRunNormalCode = () => {
        setIsTestMode(false)
        runCode()
    }

    const handleRunTestCases = () => {
        runTestCases()
    }

    const passedCount = testResults.filter(r => r.passed).length
    const totalCount = testResults.length

    return (
        <div
            className="flex flex-col items-center gap-2 p-4"
            style={{ height: viewHeight }}
        >
            <h1 className="view-title">Run Code</h1>
            <div className="flex h-[90%] w-full flex-col items-end gap-2 md:h-[92%]">
                {/* Task Selector */}
                {hasTasks && currentUser.tasks!.length > 1 && (
                    <div className="w-full rounded-md bg-darkHover p-2">
                        <label className="mb-1 block text-xs text-gray-400">
                            Select Task for Testing:
                        </label>
                        <select
                            className="w-full rounded border-none bg-gray-700 px-2 py-1 text-sm text-white outline-none"
                            value={selectedTaskIndex}
                            onChange={(e) => setSelectedTaskIndex(Number(e.target.value))}
                        >
                            {currentUser.tasks!.map((task, index) => (
                                <option key={task.id} value={index}>
                                    Task {index + 1}: {task.title}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Language Selector */}
                <div className="relative w-full">
                    <select
                        className="w-full rounded-md border-none bg-darkHover px-4 py-2 text-white outline-none"
                        value={JSON.stringify(selectedLanguage)}
                        onChange={handleLanguageChange}
                    >
                        {supportedLanguages
                            .sort((a, b) => (a.language > b.language ? 1 : -1))
                            .map((lang, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={JSON.stringify(lang)}
                                    >
                                        {lang.language +
                                            (lang.version
                                                ? ` (${lang.version})`
                                                : "")}
                                    </option>
                                )
                            })}
                    </select>
                    <PiCaretDownBold
                        size={16}
                        className="absolute bottom-3 right-4 z-10 text-white"
                    />
                </div>
                <div className="w-full">
                    <label className="mb-1 block text-sm text-gray-400">
                        Input (one value per line):
                    </label>
                    <textarea
                        className="min-h-[120px] w-full resize-none rounded-md border-none bg-darkHover p-2 text-white outline-none"
                        placeholder="Enter input values here (one per line)&#10;Example:&#10;5&#10;3"
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isTestMode}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        💡 Tip: If your code uses input(), enter values here (one per line)
                    </p>
                </div>
                <div className="flex w-full gap-2">
                    <button
                        className="flex flex-1 justify-center rounded-md bg-primary p-2 font-bold text-black outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={handleRunNormalCode}
                        disabled={isRunning}
                    >
                        Run
                    </button>
                    {hasTestCases && (
                        <button
                            className="flex flex-1 justify-center rounded-md bg-green-600 p-2 font-bold text-white outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            onClick={handleRunTestCases}
                            disabled={isRunning}
                        >
                            Run Tests
                        </button>
                    )}
                </div>
                <label className="flex w-full justify-between">
                    {isTestMode ? "Test Results :" : "Output :"}
                    {!isTestMode && (
                        <button onClick={copyOutput} title="Copy Output">
                            <LuCopy
                                size={18}
                                className="cursor-pointer text-white"
                            />
                        </button>
                    )}
                </label>
                <div className="w-full flex-grow resize-none overflow-y-auto rounded-md border-none bg-darkHover p-2 text-white outline-none">
                    {isTestMode ? (
                        <div className="space-y-3">
                            {/* Summary Banner */}
                            {testResults.length > 0 && (
                                <div className={`rounded-lg border-2 p-4 ${
                                    passedCount === totalCount
                                        ? "border-green-500 bg-green-900/30"
                                        : "border-yellow-500 bg-yellow-900/20"
                                }`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold">
                                                {passedCount === totalCount ? "All Tests Passed! 🎉" : "Some Tests Failed"}
                                            </h3>
                                            <p className="text-sm text-gray-300">
                                                {passedCount} out of {totalCount} test cases passed
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold">
                                                {passedCount}/{totalCount}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                {Math.round((passedCount / totalCount) * 100)}% Pass Rate
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Individual Test Results */}
                            {testResults.map((result, index) => (
                                <div
                                    key={index}
                                    className={`rounded-lg border p-3 ${
                                        result.passed
                                            ? "border-green-500 bg-green-900/20"
                                            : "border-red-500 bg-red-900/20"
                                    }`}
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="font-semibold">
                                            Test Case {result.testCaseIndex}
                                        </span>
                                        {result.passed ? (
                                            <FaCheckCircle className="text-green-500" size={20} />
                                        ) : (
                                            <FaTimesCircle className="text-red-500" size={20} />
                                        )}
                                    </div>
                                    
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <span className="text-gray-400">Input:</span>
                                            <pre className="mt-1 rounded bg-gray-900 p-2 text-xs text-gray-300">
                                                {result.input}
                                            </pre>
                                        </div>
                                        
                                        <div>
                                            <span className="text-gray-400">Expected:</span>
                                            <pre className="mt-1 rounded bg-gray-900 p-2 text-xs text-green-300">
                                                {result.expectedOutput}
                                            </pre>
                                        </div>
                                        
                                        <div>
                                            <span className="text-gray-400">Your Output:</span>
                                            <pre className={`mt-1 rounded bg-gray-900 p-2 text-xs ${
                                                result.passed ? "text-green-300" : "text-red-300"
                                            }`}>
                                                {result.actualOutput || "(no output)"}
                                            </pre>
                                        </div>
                                        
                                        {result.error && (
                                            <div className="rounded bg-red-900/30 p-2 text-xs text-red-400">
                                                Error: {result.error}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <code>
                            <pre className={`text-wrap ${
                                output.toLowerCase().includes('error') || 
                                output.toLowerCase().includes('traceback') ||
                                output.toLowerCase().includes('exception')
                                    ? "text-red-400"
                                    : "text-white"
                            }`}>
                                {output || "(no output)"}
                            </pre>
                        </code>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RunView
