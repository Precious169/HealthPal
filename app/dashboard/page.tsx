"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/Sidebar";
import AppHeader from "@/components/AppHeader";
import Link from "next/link";
import { getUser, logout, type User } from '@/lib/auth';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // Check authentication
        const currentUser = getUser();
        if (!currentUser) {
            router.push('/login');
            return;
        }
        setUser(currentUser);
        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-900">
                <div className="text-center">
                    <span className="material-symbols-outlined animate-spin text-cyan-400 !text-5xl">progress_activity</span>
                    <p className="mt-4 text-slate-400">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-900 overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AppHeader
                    title={`Welcome back, ${user?.name || 'Precious'}!`}
                    subtitle="Here's what's happening with your health today."
                    onMenuClick={() => setIsSidebarOpen(true)}
                />
                <main className="flex-1 overflow-y-auto p-8 relative scroll-smooth">
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/5 rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex justify-end items-start mb-6">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-bold"
                            >
                                <span className="material-symbols-outlined !text-lg">logout</span>
                                Logout
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column (Main Stats) */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Upcoming Consultation */}
                                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-5">
                                        <div className="size-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-cyan-400 shadow-sm">
                                            <span className="material-symbols-outlined !text-3xl">videocam</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-white">Upcoming Consultation</h3>
                                            <p className="text-slate-400">Dr. Sarah Johnson • Cardiology</p>
                                            <div className="flex items-center gap-3 mt-1 text-sm font-semibold text-cyan-400">
                                                <span className="material-symbols-outlined !text-sm">calendar_today</span>
                                                Today, 10:00 AM
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/telemedicine" className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-cyan-500/20 hover:brightness-105 transition-all">
                                        Join Call
                                    </Link>
                                </div>

                                {/* Vital Signs Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <VitalCard label="Heart Rate" value={user?.isDemo ? "72" : "--"} unit="bpm" icon="favorite" color="text-red-500" />
                                    <VitalCard label="Blood Pressure" value={user?.isDemo ? "120/80" : "--"} unit="mmHg" icon="blood_pressure" color="text-cyan-400" />
                                    <VitalCard label="Sleep" value={user?.isDemo ? "7.5" : "0"} unit="hrs" icon="bedtime" color="text-indigo-500" />
                                    <VitalCard label="Steps" value={user?.isDemo ? "8,432" : "0"} unit="steps" icon="directions_walk" color="text-emerald-500" />
                                </div>

                                {/* Health Records Preview */}
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-sm">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold text-white">Recent Health Records</h3>
                                        <Link href="/records" className="text-cyan-400 text-sm font-bold hover:underline">View All</Link>
                                    </div>
                                    <div className="space-y-4">
                                        {user?.isDemo ? (
                                            <>
                                                <RecordItem title="CBC Blood Panel" date="Sep 28, 2023" type="Lab Results" status="Normal" color="bg-emerald-500" />
                                                <RecordItem title="Annual Physical" date="Aug 15, 2023" type="Visit Summary" status="Verified" color="bg-cyan-400" />
                                                <RecordItem title="Chest X-Ray" date="July 02, 2023" type="Imaging" status="Pending Review" color="bg-amber-500" />
                                            </>
                                        ) : (
                                            <div className="py-10 text-center">
                                                <span className="material-symbols-outlined text-slate-600 !text-4xl mb-2">folder_open</span>
                                                <p className="text-slate-500 text-sm italic">No records uploaded yet.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (Sidebar content) */}
                            <div className="space-y-8">
                                {/* Medication Tracker */}
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-sm">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold text-lg text-white">Medication Tracker</h3>
                                        <Link href="/medication" className="text-cyan-400 text-sm font-bold hover:underline">Manage</Link>
                                    </div>
                                    <div className="space-y-6">
                                        {user?.isDemo ? (
                                            <div className="flex items-center gap-4">
                                                <div className="size-12 bg-white/5 rounded-lg flex items-center justify-center text-slate-400">
                                                    <span className="material-symbols-outlined !text-xl">pill</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-white">Lisinopril 10mg</p>
                                                    <p className="text-xs text-slate-500">Morning • Remaining: 12 days</p>
                                                </div>
                                                <button className="bg-emerald-500/10 text-emerald-500 size-8 rounded-lg flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                                                    <span className="material-symbols-outlined !text-lg font-bold">check</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="py-4 text-center">
                                                <p className="text-slate-500 text-xs italic">No active medications.</p>
                                            </div>
                                        )}
                                    </div>
                                    <button className="w-full mt-6 py-3 border-2 border-dashed border-white/10 rounded-xl text-slate-400 text-sm font-bold hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
                                        + Add Medication
                                    </button>
                                </div>

                                {/* Treatment Progress */}
                                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-cyan-500/20">
                                    <h3 className="font-bold text-lg mb-4">Treatment Progress</h3>
                                    <div className="relative pt-1">
                                        <div className="flex mb-2 items-center justify-between">
                                            <div>
                                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-white/20">Post-Op Recovery</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs font-semibold inline-block">65%</span>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white/20">
                                            <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"></div>
                                        </div>
                                    </div>
                                    <p className="text-sm opacity-80 leading-relaxed">You&apos;re doing great! Complete 3 more physical therapy sessions this week.</p>
                                    <Link href="/treatment" className="inline-block mt-4 text-sm font-bold hover:underline">View Roadmap →</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function VitalCard({ label, value, unit, icon, color }: { label: string; value: string; unit: string; icon: string; color: string }) {
    return (
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl shadow-sm">
            <div className={`size-10 ${color.replace('text-', 'bg-').replace('400', '400/10').replace('500', '500/10')} ${color} rounded-lg flex items-center justify-center mb-4`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
            <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold tracking-tight text-white">{value}</span>
                <span className="text-xs font-medium text-slate-400">{unit}</span>
            </div>
        </div>
    );
}

function RecordItem({ title, date, type, status, color }: { title: string; date: string; type: string; status: string; color: string }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-4">
                <div className={`size-2 rounded-full ${color}`}></div>
                <div>
                    <h4 className="font-bold text-sm tracking-tight text-white">{title}</h4>
                    <p className="text-xs text-slate-400">{type} • {date}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">{status}</span>
                <span className="material-symbols-outlined text-slate-600 group-hover:text-cyan-400 transition-colors">chevron_right</span>
            </div>
        </div>
    );
}
