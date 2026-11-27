import { Router } from "express"

const compiler = Router()

interface Language {
    id: number
    name: string
}

interface Result {
    status: {
        id: number
        description: string
    }
    stdout?: string | null
    stderr?: string | null
    compile_output?: string | null
    message?: string | null
}

const aliases: Record<string, string[]> = {
    c: ["c"],
    "c++": ["cpp", "cc", "cxx"],
    "c#": ["cs"],
    python: ["py"],
    java: ["java"],
    javascript: ["js"],
    typescript: ["ts"],
    ruby: ["rb"],
    rust: ["rs"],
    go: ["go"],
    php: ["php"],
    kotlin: ["kt"],
    swift: ["swift"],
    bash: ["sh"],
}

async function request<T>(
    path: string,
    signal: AbortSignal,
    body?: object,
): Promise<T> {
    const base = process.env.JUDGE0_API_URL?.replace(/\/+$/, "")

    if (!base) {
        throw new Error("Set JUDGE0_API_URL on the backend")
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    }

    if (process.env.JUDGE0_API_KEY) {
        const headerName =
            process.env.JUDGE0_KEY_HEADER || "X-Auth-Token"

        headers[headerName] = process.env.JUDGE0_API_KEY
    }

    if (process.env.JUDGE0_RAPIDAPI_HOST) {
        headers["X-RapidAPI-Host"] =
            process.env.JUDGE0_RAPIDAPI_HOST
    }

    const response = await fetch(`${base}${path}`, {
        method: body ? "POST" : "GET",
        headers,
        signal,
        body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
        throw new Error(
            `Judge0 returned HTTP ${response.status}`,
        )
    }

    return (await response.json()) as T
}

compiler.get("/runtimes", async (_req, res) => {
    try {
        const languages = await request<Language[]>(
            "/languages",
            AbortSignal.timeout(10000),
        )

        const runtimes = languages
            .filter((item) => !/multi-file/i.test(item.name))
            .map((item) => {
                const name = item.name
                    .split(" (")[0]
                    .toLowerCase()

                return {
                    language: item.name,
                    version: String(item.id),
                    aliases: aliases[name] || [name],
                }
            })

        res.json(runtimes)
    } catch (error) {
        res.status(502).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Cannot load languages",
        })
    }
})

function decode(value?: string | null): string {
    return Buffer.from(value || "", "base64").toString("utf8")
}

compiler.post("/execute", async (req, res) => {
    const { version, files, stdin = "" } = req.body || {}
    const languageId = Number(version)

    if (
        !Number.isInteger(languageId) ||
        languageId <= 0 ||
        !Array.isArray(files) ||
        files.length !== 1 ||
        typeof files[0]?.content !== "string" ||
        !files[0].content.trim() ||
        typeof stdin !== "string"
    ) {
        res.status(400).json({
            message:
                "Select a language and provide one non-empty source file and text input",
        })
        return
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 25000)
    const cancel = () => controller.abort()

    res.on("close", cancel)

    try {
        const submission = await request<{ token: string }>(
            "/submissions?base64_encoded=true&wait=false",
            controller.signal,
            {
                language_id: languageId,
                source_code: Buffer.from(
                    files[0].content,
                ).toString("base64"),
                stdin: Buffer.from(stdin).toString("base64"),
            },
        )

        if (!submission.token) {
            throw new Error(
                "Judge0 returned no submission token",
            )
        }

        while (true) {
            await new Promise((resolve) =>
                setTimeout(resolve, 1000),
            )

            const token = encodeURIComponent(submission.token)

            const result = await request<Result>(
                `/submissions/${token}?base64_encoded=true`,
                controller.signal,
            )

            // Status 1 means queued; status 2 means processing.
            if (result.status.id <= 2) {
                continue
            }

            const succeeded = result.status.id === 3
            const stdout = decode(result.stdout)
            const stderr = decode(result.stderr)

            const failure =
                decode(result.compile_output) ||
                stderr ||
                decode(result.message) ||
                result.status.description

            res.json({
                run: {
                    stdout,
                    stderr: succeeded ? stderr : failure,
                    code: succeeded ? 0 : 1,
                    signal: null,
                },
            })

            return
        }
    } catch (error) {
        if (!res.destroyed) {
            res.status(controller.signal.aborted ? 504 : 502).json({
                message: controller.signal.aborted
                    ? "Execution timed out; Judge0 may still be processing it"
                    : error instanceof Error
                      ? error.message
                      : "Execution failed",
            })
        }
    } finally {
        clearTimeout(timer)
        res.off("close", cancel)
    }
})

export default compiler