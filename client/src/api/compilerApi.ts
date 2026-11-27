import axios from "axios"

const backendUrl = (
    import.meta.env.VITE_BACKEND_URL ||
    "http://localhost:3000"
).replace(/\/+$/, "")

const compilerApi = axios.create({
    baseURL: `${backendUrl}/api/compiler`,
    timeout: 35000,
    headers: {
        "Content-Type": "application/json",
    },
})

export default compilerApi