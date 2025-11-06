import { useRunCode } from "@/context/RunCodeContext"
import useResponsive from "@/hooks/useResponsive"
import { ChangeEvent } from "react"
import toast from "react-hot-toast"
import { LuCopy } from "react-icons/lu"
import { PiCaretDownBold } from "react-icons/pi"

function RunView() {
    const { viewHeight } = useResponsive()
    const {
        setInput,
        output,
        isRunning,
        supportedLanguages,
        selectedLanguage,
        setSelectedLanguage,
        runCode,
    } = useRunCode()

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = JSON.parse(e.target.value)
        setSelectedLanguage(lang)
    }

    const copyOutput = () => {
        navigator.clipboard.writeText(output)
        toast.success("Output copied to clipboard")
    }

    return (
        <div
            className="flex flex-col items-center gap-3 p-4"
            style={{ height: viewHeight }}
        >
            <h1 className="view-title">Run Code</h1>
            <div className="flex h-[90%] w-full flex-col gap-3 md:h-[92%]">
                {/* Language Selector */}
                <div className="relative w-full">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 block">
                        Language
                    </label>
                    <select
                        className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2.5 text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
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
                        className="absolute bottom-3 right-3 pointer-events-none text-neutral-500 dark:text-neutral-400"
                    />
                </div>

                {/* Input Area */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Input (stdin)
                    </label>
                    <textarea
                        className="min-h-[120px] w-full resize-none rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Write your input here..."
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                {/* Run Button */}
                <button
                    className="flex w-full justify-center items-center gap-2 rounded-lg bg-primary-500 hover:bg-primary-600 active:bg-primary-700 px-4 py-2.5 font-semibold text-white shadow-sm hover:shadow-md transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    onClick={runCode}
                    disabled={isRunning}
                >
                    {isRunning ? (
                        <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Running...
                        </>
                    ) : (
                        "Run Code"
                    )}
                </button>

                {/* Output Section */}
                <div className="flex flex-col gap-1.5 flex-grow min-h-0">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Output
                        </label>
                        <button 
                            onClick={copyOutput} 
                            title="Copy Output"
                            className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            aria-label="Copy output"
                        >
                            <LuCopy
                                size={18}
                                className="text-neutral-600 dark:text-neutral-400"
                            />
                        </button>
                    </div>
                    <div className="flex-grow overflow-y-auto rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 p-3">
                        <code className="text-sm text-neutral-900 dark:text-neutral-100 font-mono">
                            <pre className="text-wrap whitespace-pre-wrap">
                                {output || "No output yet. Run your code to see results."}
                            </pre>
                        </code>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RunView
