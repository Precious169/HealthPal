interface EmptyStateProps {
    icon: string;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="size-20 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-cyan-500 !text-5xl">{icon}</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">{description}</p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}
