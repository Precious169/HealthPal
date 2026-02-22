"use client";

import Link from "next/link";

export default function AppHeader({ title, subtitle, onMenuClick }: { title?: string; subtitle?: string; onMenuClick?: () => void }) {
    return (
        <header className="flex justify-between items-center mb-6 md:mb-10 px-4 md:px-0">
            <div className="flex items-center gap-4">
                {title ? (
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight font-heading truncate max-w-[200px] md:max-w-none">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-slate-400 mt-1 text-xs md:text-sm hidden sm:block">{subtitle}</p>
                        )}
                    </div>
                ) : <div />}
            </div>
            <div className="flex items-center gap-2 md:gap-4">
                <button className="hidden sm:flex size-11 items-center justify-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:border-primary/30 transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
                <Link href="/telemedicine" className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-bold text-xs md:text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 whitespace-nowrap">
                    <span className="material-symbols-outlined !text-lg">add_circle</span>
                    <span className="hidden xs:inline">Book Consultation</span>
                    <span className="xs:hidden">Book</span>
                </Link>
                {onMenuClick && (
                    <button
                        onClick={onMenuClick}
                        className="md:hidden size-11 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all shadow-sm"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                )}
            </div>
        </header>
    );
}
