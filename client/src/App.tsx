/**
 * App Component - Root application component with theming
 * 
 * Improvements:
 * - Added ThemeProvider for dark/light mode support
 * - Clean component structure
 * - Better organization
 */

import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import GitHubCorner from "./components/GitHubCorner"
import Toast from "./components/toast/Toast"
import EditorPage from "./pages/EditorPage"
import HomePage from "./pages/HomePage"
import { ThemeProvider } from "./context/ThemeContext"

const App = () => {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editor/:roomId" element={<EditorPage />} />
                </Routes>
            </Router>
            <Toast /> {/* Toast notifications */}
            <GitHubCorner />
        </ThemeProvider>
    )
}

export default App
