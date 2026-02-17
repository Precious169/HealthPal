"use client";

export default function AppHeader({ title, subtitle }: { title?: string; subtitle?: string }) {
    return (
        <header className="flex justify-between items-center mb-10">
            {title ? (
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight font-heading">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-slate-400 mt-1">{subtitle}</p>
                    )}
                </div>
            ) : <div />}
            <div className="flex items-center gap-4">
                <button className="size-11 flex items-center justify-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:border-primary/30 transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg shadow-secondary/20">
                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                    Book Consultation
                </button>
            </div>
        </header>
    );
}
