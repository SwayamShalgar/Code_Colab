/**
 * Footer Component - Modern footer with improved styling
 * 
 * Design improvements:
 * - Better typography and spacing
 * - Smooth hover effects
 * - Responsive design
 * - Accessible links
 */

function Footer() {
    return (
        <footer className="relative py-6 px-4 border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="flex items-center gap-1.5">
                        Built with 
                        <span className="text-danger-500 animate-pulse inline-block">❤️</span>
                        by
                    </span>
                    <a
                        href="https://github.com/SwayamShalgar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 underline decoration-primary-600/30 dark:decoration-primary-400/30 hover:decoration-primary-600 dark:hover:decoration-primary-400 underline-offset-4"
                        aria-label="Visit Swayam Shalgar's GitHub profile"
                    >
                        Swayam Shalgar
                    </a>
                </div>
                
                {/* Optional: Add version or copyright */}
                <div className="text-xs text-center text-neutral-500 dark:text-neutral-500 mt-2">
                    © {new Date().getFullYear()} Code-Sync. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
