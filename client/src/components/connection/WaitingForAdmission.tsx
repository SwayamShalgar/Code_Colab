function WaitingForAdmission() {
    return (
        <div className="flex h-screen min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
            <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <h2 className="text-2xl font-bold text-white">
                    Waiting for Admin Approval
                </h2>
                <p className="text-lg text-slate-300">
                    The room admin will review your request shortly...
                </p>
            </div>
        </div>
    )
}

export default WaitingForAdmission
