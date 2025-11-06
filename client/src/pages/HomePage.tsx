/**
 * HomePage - Modern landing page with improved layout and animations
 * 
 * Design improvements:
 * - Better responsive layout
 * - Gradient background
 * - Smooth animations
 * - Improved spacing and visual hierarchy
 * - Theme toggle in top-right corner
 */

import illustration from "@/assets/illustration.svg"
import FormComponent from "@/components/forms/FormComponent"
import Footer from "@/components/common/Footer"
import ThemeToggle from "@/components/common/ThemeToggle"

function HomePage() {
    return (
        <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-neutral-50 via-white to-primary-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900">
            {/* Theme Toggle Button - Top Right */}
            <div className="absolute top-4 right-4 z-10">
                <ThemeToggle />
            </div>

            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900/20 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 dark:bg-secondary-900/20 rounded-full blur-3xl opacity-50"></div>
            </div>

            {/* Main content */}
            <div className="relative flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
                        {/* Illustration Section */}
                        <div className="flex-1 flex justify-center items-center order-2 lg:order-1">
                            <div className="relative animate-up-down">
                                <img
                                    src={illustration}
                                    alt="Code Sync Illustration - Collaborative coding"
                                    className="w-64 sm:w-80 lg:w-96 object-contain drop-shadow-2xl"
                                />
                                {/* Floating elements for visual interest */}
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-400/20 dark:bg-primary-600/20 rounded-full blur-xl animate-pulse"></div>
                                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary-400/20 dark:bg-secondary-600/20 rounded-full blur-xl animate-pulse delay-75"></div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="flex-1 flex justify-center items-center w-full order-1 lg:order-2">
                            <div className="w-full max-w-md animate-fade-in">
                                <FormComponent />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default HomePage
