interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
    return (
        <div
            className={`bg-white/10 dark:bg-slate-900/20 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-lg ${hover ? 'hover:bg-white/20 dark:hover:bg-slate-900/30 hover:shadow-xl transition-all duration-300' : ''
                } ${className}`}
        >
            {children}
        </div>
    );
}
