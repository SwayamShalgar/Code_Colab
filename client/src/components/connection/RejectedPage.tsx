import { useNavigate } from "react-router-dom"

function RejectedPage() {
    const navigate = useNavigate()

    const gotoHomePage = () => {
        navigate("/")
    }

    return (
        <div className="flex h-screen min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
            <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
                    <svg
                        className="h-10 w-10 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                    Access Denied
                </h2>
                <p className="text-lg text-slate-300">
                    Your request to join this room was rejected by the admin.
                </p>
                <button
                    className="mt-4 rounded-md bg-primary px-8 py-2 font-bold text-black transition-colors hover:bg-primary/90"
                    onClick={gotoHomePage}
                >
                    Go to HomePage
                </button>
            </div>
        </div>
    )
}

export default RejectedPage
