"use client";

import Link from "next/link";

export default function AppHeader({ title, subtitle, onMenuClick, showBook = false }: { title?: string; subtitle?: string; onMenuClick?: () => void; showBook?: boolean }) {
    return (
        <header className="flex justify-between items-center mb-4 md:mb-6 px-4 md:px-0 pt-4 md:pt-0">
            <div className="flex items-center gap-3">
                {title && (
                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight font-heading truncate max-w-[200px] md:max-w-none">
                        {title}
                    </h1>
                )}
                {onMenuClick && (
                    <button
                        onClick={onMenuClick}
                        className="md:hidden size-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all shadow-sm"
                    >
                        <span className="material-symbols-outlined !text-xl">menu</span>
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <button className="hidden sm:flex size-10 items-center justify-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:border-primary/30 transition-colors">
                    <span className="material-symbols-outlined !text-xl">notifications</span>
                </button>
                {showBook && (
                    <Link href="/telemedicine" className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-bold text-xs md:text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 whitespace-nowrap active:scale-95">
                        <span className="material-symbols-outlined !text-lg">add_circle</span>
                        <span className="hidden xs:inline">Book Consultation</span>
                        <span className="xs:hidden">Book</span>
                    </Link>
                )}
            </div>
        </header>
    );
}
