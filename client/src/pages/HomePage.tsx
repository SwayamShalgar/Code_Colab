import FormComponent from "@/components/forms/FormComponent"

export default function HomePage() {
    return (
        <div className="orbit-home">
            <header className="orbit-header">
                <a
                    href="/"
                    className="orbit-brand"
                    aria-label="CodeOrbit home"
                >
                    <span className="orbit-mark" aria-hidden="true">
                        CO
                    </span>
                    CodeOrbit
                </a>

                <a href="#room" className="orbit-header-link">
                    Enter workspace
                </a>
            </header>

            <main className="orbit-hero">
                <section className="orbit-intro">
                    <p className="orbit-eyebrow">
                        A shared space for your next idea
                    </p>

                    <h1>
                        Great code.
                        <br />
                        <span>Better together.</span>
                    </h1>

                    <p className="orbit-description">
                        Bring your team into one workspace. Write code,
                        run it, and work through the tricky parts together.
                    </p>

                    <div className="orbit-features">
                        <div>
                            <strong>Code together</strong>
                            <p>Share files and edit in real time.</p>
                        </div>

                        <div>
                            <strong>Run & learn</strong>
                            <p>Execute programs and check test cases.</p>
                        </div>

                        <div>
                            <strong>Stay connected</strong>
                            <p>Keep chat and calls beside your code.</p>
                        </div>
                    </div>

                    <div className="orbit-note">
                        <span aria-hidden="true">&lt;/&gt;</span>
                        <p>Your next project starts with a room.</p>
                    </div>
                </section>

                <section
                    id="room"
                    className="orbit-room"
                    aria-label="Create or join a room"
                >
                    <FormComponent />
                </section>
            </main>

            <footer className="orbit-footer">
                <span>CodeOrbit</span>
                <span>Make room for better ideas.</span>
            </footer>
        </div>
    )
}