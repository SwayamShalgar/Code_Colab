/**
 * SettingsView - Modern settings panel with improved UX
 * 
 * Design improvements:
 * - Uses new UI components for consistency
 * - Better layout and spacing
 * - Modern toggle switch
 * - Theme toggle integration
 * - Grouped settings sections
 */

import Select from "@/components/common/Select"
import { useSettings } from "@/context/SettingContext"
import useResponsive from "@/hooks/useResponsive"
import { editorFonts } from "@/resources/Fonts"
import { editorThemes } from "@/resources/Themes"
import { langNames } from "@uiw/codemirror-extensions-langs"
import { ChangeEvent, useEffect } from "react"
import { Button, Card } from "@/components/ui"
import ThemeToggle from "@/components/common/ThemeToggle"
import { IoRefreshOutline } from "react-icons/io5"

function SettingsView() {
    const {
        theme,
        setTheme,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
        showGitHubCorner,
        setShowGitHubCorner,
        resetSettings,
    } = useSettings()
    const { viewHeight } = useResponsive()

    const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setFontFamily(e.target.value)
    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setTheme(e.target.value)
    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setLanguage(e.target.value)
    const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setFontSize(parseInt(e.target.value))
    const handleShowGitHubCornerChange = (e: ChangeEvent<HTMLInputElement>) =>
        setShowGitHubCorner(e.target.checked)

    useEffect(() => {
        // Set editor font family
        const editor = document.querySelector(
            ".cm-editor > .cm-scroller",
        ) as HTMLElement
        if (editor !== null) {
            editor.style.fontFamily = `${fontFamily}, monospace`
        }
    }, [fontFamily])

    return (
        <div
            className="flex flex-col gap-4 p-4 overflow-y-auto"
            style={{ height: viewHeight }}
        >
            {/* Header with theme toggle */}
            <div className="flex items-center justify-between">
                <h1 className="view-title mb-0">Settings</h1>
                <ThemeToggle />
            </div>

            {/* Editor Settings Section */}
            <Card variant="default" padding="md" className="space-y-4">
                <h2 className="section-title">Editor</h2>
                
                {/* Font Settings Row */}
                <div className="grid grid-cols-[1fr,auto] gap-3">
                    <Select
                        onChange={handleFontFamilyChange}
                        value={fontFamily}
                        options={editorFonts}
                        title="Font Family"
                    />
                    
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Size
                        </label>
                        <select
                            value={fontSize}
                            onChange={handleFontSizeChange}
                            className="px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 cursor-pointer appearance-none"
                            title="Font Size"
                        >
                            {[...Array(13).keys()].map((size) => {
                                return (
                                    <option key={size} value={size + 12}>
                                        {size + 12}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>

                {/* Theme Selection */}
                <Select
                    onChange={handleThemeChange}
                    value={theme}
                    options={Object.keys(editorThemes)}
                    title="Editor Theme"
                />

                {/* Language Selection */}
                <Select
                    onChange={handleLanguageChange}
                    value={language}
                    options={langNames}
                    title="Language"
                />
            </Card>

            {/* Appearance Settings Section */}
            <Card variant="default" padding="md" className="space-y-4">
                <h2 className="section-title">Appearance</h2>
                
                {/* GitHub Corner Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer">
                        Show GitHub Corner
                    </label>
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input
                            className="peer sr-only"
                            type="checkbox"
                            onChange={handleShowGitHubCornerChange}
                            checked={showGitHubCorner}
                            aria-label="Toggle GitHub corner visibility"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-neutral-300 dark:bg-neutral-700 outline-none transition-all duration-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:duration-200 peer-checked:bg-primary-500 peer-checked:after:translate-x-5 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2"></div>
                    </label>
                </div>
            </Card>

            {/* Reset Button */}
            <Button
                variant="secondary"
                size="md"
                isFullWidth
                onClick={resetSettings}
                leftIcon={<IoRefreshOutline size={18} />}
                className="mt-auto"
            >
                Reset to Default
            </Button>
        </div>
    )
}

export default SettingsView
