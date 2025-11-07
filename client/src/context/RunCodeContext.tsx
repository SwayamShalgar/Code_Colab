import axiosInstance from "@/api/pistonApi"
import { Language, RunContext as RunContextType, TestResult } from "@/types/run"
import langMap from "lang-map"
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"
import toast from "react-hot-toast"
import { useFileSystem } from "./FileContext"
import { useAppContext } from "./AppContext"

const RunCodeContext = createContext<RunContextType | null>(null)

export const useRunCode = () => {
    const context = useContext(RunCodeContext)
    if (context === null) {
        throw new Error(
            "useRunCode must be used within a RunCodeContextProvider",
        )
    }
    return context
}

const RunCodeContextProvider = ({ children }: { children: ReactNode }) => {
    const { activeFile } = useFileSystem()
    const { currentUser } = useAppContext()
    const [input, setInput] = useState<string>("")
    const [output, setOutput] = useState<string>("")
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [supportedLanguages, setSupportedLanguages] = useState<Language[]>([])
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({
        language: "",
        version: "",
        aliases: [],
    })
    const [testResults, setTestResults] = useState<TestResult[]>([])
    const [isTestMode, setIsTestMode] = useState<boolean>(false)
    const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0)

    useEffect(() => {
        const fetchSupportedLanguages = async () => {
            try {
                const languages = await axiosInstance.get("/runtimes")
                setSupportedLanguages(languages.data)
            } catch (error: any) {
                toast.error("Failed to fetch supported languages")
                if (error?.response?.data) console.error(error?.response?.data)
            }
        }

        fetchSupportedLanguages()
    }, [])

    // Set the selected language based on the file extension
    useEffect(() => {
        if (supportedLanguages.length === 0 || !activeFile?.name) return

        const extension = activeFile.name.split(".").pop()
        if (extension) {
            const languageName = langMap.languages(extension)
            const language = supportedLanguages.find(
                (lang) =>
                    lang.aliases.includes(extension) ||
                    languageName.includes(lang.language.toLowerCase()),
            )
            if (language) setSelectedLanguage(language)
        } else setSelectedLanguage({ language: "", version: "", aliases: [] })
    }, [activeFile?.name, supportedLanguages])

    const runCode = async () => {
        try {
            if (!selectedLanguage) {
                return toast.error("Please select a language to run the code")
            } else if (!activeFile) {
                return toast.error("Please open a file to run the code")
            }
            
            // Check if code contains input() and warn if no input provided
            const codeContent = activeFile.content?.toLowerCase() || ''
            if ((codeContent.includes('input(') || codeContent.includes('scanner') || 
                 codeContent.includes('bufferedreader') || codeContent.includes('cin')) && 
                !input.trim()) {
                const shouldContinue = window.confirm(
                    "⚠️ Your code appears to use input, but no input values were provided.\n\n" +
                    "This may cause errors like 'ValueError' or 'EOFError'.\n\n" +
                    "Click OK to run anyway, or Cancel to add input first."
                )
                if (!shouldContinue) {
                    return
                }
            }
            
            toast.loading("Running code...")

            setIsRunning(true)
            const { language, version } = selectedLanguage

            const response = await axiosInstance.post("/execute", {
                language,
                version,
                files: [{ name: activeFile.name, content: activeFile.content }],
                stdin: input,
            })
            
            // Display output or errors
            if (response.data.run.stderr) {
                setOutput(response.data.run.stderr)
                toast.dismiss()
                toast.error("Code execution failed - check output for errors")
            } else if (response.data.run.stdout) {
                setOutput(response.data.run.stdout)
                toast.dismiss()
                toast.success("Code executed successfully")
            } else {
                setOutput("(no output)")
                toast.dismiss()
                toast.success("Code executed successfully")
            }
            setIsRunning(false)
        } catch (error: any) {
            console.error(error?.response?.data)
            setIsRunning(false)
            toast.dismiss()
            
            // Show detailed error message
            const errorMessage = error?.response?.data?.message || 
                               error?.response?.data?.error || 
                               "Failed to run the code"
            setOutput(`Error: ${errorMessage}`)
            toast.error("Failed to execute code")
        }
    }

    const runTestCases = async () => {
        try {
            if (!selectedLanguage) {
                return toast.error("Please select a language to run the code")
            } else if (!activeFile) {
                return toast.error("Please open a file to run the code")
            } else if (!currentUser.tasks || currentUser.tasks.length === 0) {
                return toast.error("No tasks available")
            } else if (!currentUser.tasks[selectedTaskIndex]) {
                return toast.error("Selected task not found")
            }

            const selectedTask = currentUser.tasks[selectedTaskIndex]
            
            if (selectedTask.testCases.length === 0) {
                return toast.error("No test cases available for this task")
            }

            toast.loading("Running test cases...")
            setIsRunning(true)
            setIsTestMode(true)

            const { language, version } = selectedLanguage
            const results: TestResult[] = []

            // Run code for each test case
            for (let i = 0; i < selectedTask.testCases.length; i++) {
                const testCase = selectedTask.testCases[i]
                
                try {
                    const response = await axiosInstance.post("/execute", {
                        language,
                        version,
                        files: [{ name: activeFile.name, content: activeFile.content }],
                        stdin: testCase.input,
                    })

                    const actualOutput = response.data.run.stderr || response.data.run.stdout
                    const expectedOutput = testCase.expectedOutput.trim()
                    const actualOutputTrimmed = actualOutput.trim()
                    
                    results.push({
                        testCaseIndex: i + 1,
                        input: testCase.input,
                        expectedOutput: testCase.expectedOutput,
                        actualOutput: actualOutput,
                        passed: actualOutputTrimmed === expectedOutput,
                        error: response.data.run.stderr ? "Runtime Error" : undefined,
                    })
                } catch (error: any) {
                    results.push({
                        testCaseIndex: i + 1,
                        input: testCase.input,
                        expectedOutput: testCase.expectedOutput,
                        actualOutput: "",
                        passed: false,
                        error: "Execution failed",
                    })
                }
            }

            setTestResults(results)
            setIsRunning(false)
            toast.dismiss()

            const passedCount = results.filter(r => r.passed).length
            const totalCount = results.length

            if (passedCount === totalCount) {
                toast.success(`All ${totalCount} test cases passed! 🎉`)
            } else {
                toast.error(`${passedCount}/${totalCount} test cases passed`)
            }
        } catch (error: any) {
            console.error(error)
            setIsRunning(false)
            toast.dismiss()
            toast.error("Failed to run test cases")
        }
    }

    return (
        <RunCodeContext.Provider
            value={{
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
            }}
        >
            {children}
        </RunCodeContext.Provider>
    )
}

export { RunCodeContextProvider }
export default RunCodeContext
