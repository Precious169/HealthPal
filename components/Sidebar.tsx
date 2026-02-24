"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, logout, type User } from "@/lib/auth";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "grid_view" },
    { name: "Telemedicine", href: "/telemedicine", icon: "videocam" },
    { name: "Health Records", href: "/records", icon: "folder_shared" },
    { name: "Medication", href: "/medication", icon: "pill" },
    { name: "Treatment Management", href: "/treatment", icon: "monitoring" },
];

const footerItems = [
    { name: "Settings", href: "/settings", icon: "settings" },
];

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            <aside className={`fixed md:sticky top-0 left-0 z-[60] w-72 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out shrink-0 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}>
                <div className="p-6 flex-1 flex flex-col overflow-y-auto">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3 group">
                            <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined !text-2xl filled">health_and_safety</span>
                            </div>
                            <span className="font-heading font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-white/60">HealthPal</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="md:hidden text-slate-500 hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <nav className="space-y-1.5 flex-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-primary/10 text-primary font-semibold"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        }`}
                                >
                                    <span className={`material-symbols-outlined ${isActive ? "filled" : ""}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                        {footerItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-primary/10 text-primary font-semibold"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        }`}
                                >
                                    <span className={`material-symbols-outlined ${isActive ? "filled" : ""}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm">{item.name}</span>
                                </Link>
                            );
                        })}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors text-left"
                        >
                            <span className="material-symbols-outlined">logout</span>
                            <span className="text-sm font-medium">Log Out</span>
                        </button>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <img
                            alt="User Profile"
                            className="size-10 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSB0J9CrQZ94WD4udUbheAMiP_TBhvPhvOR6wLbPgcwcwdF-3l6bex19ArGyp-IT4eCqoALh4K8F38g21n0aunrd0CxBu5gSpzUIn4TvW1trNc0w2vMPEapMd5x6GOoj4CEl_NYk40hFnnxNSWE_t8_Mzp7dh-5sNX8447IYdqSa_xfUdUOEWNiG1M_Z6Fz51QZ-2mTuqtOwTCDo3Uxeo7Vf8pIPH5s9--n1slj-i2zpSlUGyTt6ynRomIUhEG0I-YjrrvT71W28Q"
                        />
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold truncate">{user?.name || "User"}</span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Patient ID: {user?.id?.split('_')?.at(-1) || "GUEST"}</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
