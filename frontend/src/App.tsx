import {Button, ThemeToggle} from "./components/atoms";

function App() {
    return (
        <div
            className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
            <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
                <div
                    className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div>
                        <h1 className="text-2xl font-semibold">FAQ Interne</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Base visuelle moderne avec light et dark mode.
                        </p>
                    </div>

                    <ThemeToggle/>
                </div>

                <div
                    className="flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                    <Button isLoading>Chargement</Button>
                </div>
            </div>
        </div>
    );
}

export default App;