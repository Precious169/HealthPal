import Link from 'next/link';

interface PageHeaderProps {
    title?: string;
    subtitle?: string;
    breadcrumbs?: { label: string; href: string }[];
    action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumbs, action }: PageHeaderProps) {
    return (
        <div className="mb-8">
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-2 text-sm mb-4">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={crumb.href} className="flex items-center gap-2">
                            {index > 0 && <span className="text-slate-400">/</span>}
                            <Link
                                href={crumb.href}
                                className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                            >
                                {crumb.label}
                            </Link>
                        </div>
                    ))}
                </nav>
            )}

            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-2 text-white">{title}</h1>
                    {subtitle && <p className="text-slate-400 text-lg">{subtitle}</p>}
                </div>
                {action && <div>{action}</div>}
            </div>
        </div>
    );
}
