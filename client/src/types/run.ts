interface Language {
    language: string
    version: string
    aliases: string[]
}

interface TestResult {
    testCaseIndex: number
    input: string
    expectedOutput: string
    actualOutput: string
    passed: boolean
    error?: string
}

interface RunContext {
    setInput: (input: string) => void
    output: string
    isRunning: boolean
    supportedLanguages: Language[]
    selectedLanguage: Language
    setSelectedLanguage: (language: Language) => void
    runCode: () => void
    runTestCases: () => void
    testResults: TestResult[]
    isTestMode: boolean
    setIsTestMode: (isTestMode: boolean) => void
    selectedTaskIndex: number
    setSelectedTaskIndex: (index: number) => void
}

export { Language, RunContext, TestResult }
