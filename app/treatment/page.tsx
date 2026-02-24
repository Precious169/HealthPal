"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AppHeader from "@/components/AppHeader";
import { getUser } from "@/lib/auth";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export default function TreatmentPage() {
    const router = useRouter();
    const [user, setUser] = useState(getUser());
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-900">
                <span className="material-symbols-outlined animate-spin text-cyan-400 !text-5xl">progress_activity</span>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-900 overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AppHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto p-8 relative scroll-smooth">
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/5 rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <PageHeader
                            breadcrumbs={[
                                { label: "Dashboard", href: "/dashboard" },
                                { label: "Treatment", href: "/treatment" },
                            ]}
                        />

                        {user.isDemo ? (
                            <div className="grid grid-cols-12 gap-8">
                                {/* Main Plan Column */}
                                <div className="col-span-12 lg:col-span-8 space-y-8">
                                    {/* Active Plan Card */}
                                    <GlassCard className="p-8 flex flex-col md:flex-row items-center gap-8 border-white/10">
                                        <div className="relative size-40 flex items-center justify-center shrink-0">
                                            <svg className="size-full" viewBox="0 0 100 100">
                                                <circle className="text-white/5 stroke-current" cx="50" cy="50" fill="transparent" r="42" strokeWidth="8"></circle>
                                                <circle className="text-cyan-400 stroke-current" cx="50" cy="50" fill="transparent" r="42" strokeLinecap="round" strokeWidth="8" style={{ strokeDasharray: "263.89", strokeDashoffset: "92.36", transition: "stroke-dashoffset 0.35s", transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}></circle>
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-3xl font-black text-white">65%</span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Done</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <span className="bg-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 inline-block">Active Plan</span>
                                            <h3 className="text-3xl font-bold text-white mb-2 font-heading">Post-Surgery Recovery</h3>
                                            <div className="flex items-center gap-6 mt-4 justify-center md:justify-start text-white/60">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold uppercase tracking-tighter">Started On</span>
                                                    <span className="text-base font-bold text-white">Oct 12, 2023</span>
                                                </div>
                                                <div className="w-px h-8 bg-white/10"></div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold uppercase tracking-tighter">Current Phase</span>
                                                    <span className="text-base font-bold text-blue-400">Week 3 - Strengthening</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-3.5 px-8 rounded-xl hover:brightness-105 transition-all w-full md:w-auto shadow-lg shadow-cyan-500/20">
                                            View Schedule
                                        </button>
                                    </GlassCard>

                                    {/* Milestones */}
                                    <GlassCard className="p-8 border-white/10">
                                        <h4 className="text-xl font-bold mb-8 text-white">Milestones & Goals</h4>
                                        <div className="relative">
                                            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-white/5"></div>
                                            <div className="space-y-10 relative">
                                                <MilestoneItem title="Week 2: Mobility Exercises" desc="Completed on Oct 26 • Excellent progress noted" status="done" />
                                                <MilestoneItem title="Week 3: Weighted Resistance" desc="Current Phase • 4 sessions remaining this week" status="current" />
                                                <MilestoneItem title="Week 4: Surgeon Follow-up" desc="Scheduled for Nov 10 • Hospital Center Wing B" status="future" />
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>

                                {/* Support Column */}
                                <div className="col-span-12 lg:col-span-4 space-y-8">
                                    {/* Health Trends */}
                                    <GlassCard className="p-6 border-white/10">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="font-bold text-white">Health Trends</h4>
                                            <span className="text-xs font-bold text-cyan-400 uppercase">Last 14 Days</span>
                                        </div>
                                        <div className="space-y-8">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-xs font-bold text-slate-400 uppercase">Pain Intensity</span>
                                                    <span className="text-xs font-bold text-emerald-400">↓ 24% Imp.</span>
                                                </div>
                                                <div className="h-24 w-full flex items-end gap-1.5">
                                                    {[80, 75, 60, 65, 40, 35, 30].map((h, i) => (
                                                        <div key={i} className={`flex-1 rounded-sm ${i > 3 ? "bg-cyan-500" : "bg-cyan-500/20"}`} style={{ height: `${h}%` }}></div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>

                                    {/* Specialist Note */}
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
                                        <span className="material-symbols-outlined !text-7xl absolute -right-3 -top-3 text-white/5 select-none group-hover:scale-110 transition-transform">format_quote</span>
                                        <div className="flex items-center gap-3 mb-4 relative z-10">
                                            <div className="size-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                                                <span className="material-symbols-outlined text-cyan-400">medical_services</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold leading-none text-white">Dr. Sarah Miller</p>
                                                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider mt-1">Lead Orthopedist</p>
                                            </div>
                                        </div>
                                        <h5 className="text-sm font-bold mb-2 text-white relative z-10">Notes from Specialist</h5>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-4 relative z-10">
                                            "Your knee extension looks significantly better this week. Let's start introducing light resistance bands."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <GlassCard className="p-12">
                                <EmptyState
                                    icon="assignment"
                                    title="No active treatment plans"
                                    description="Your personalized treatment plans will appear here once assigned by your healthcare provider."
                                />
                            </GlassCard>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

function MilestoneItem({ title, desc, status }: { title: string; desc: string; status: "done" | "current" | "future" }) {
    const isDone = status === "done";
    const isCurrent = status === "current";

    return (
        <div className="flex gap-6 items-start">
            <div className="z-10 bg-slate-900 p-1">
                <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold ${isDone ? "bg-emerald-500 text-white" : isCurrent ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30" : "border-2 border-white/10 text-slate-500"}`}>
                    <span className="material-symbols-outlined !text-sm">
                        {isDone ? "check" : isCurrent ? "directions_run" : "calendar_month"}
                    </span>
                </div>
            </div>
            <div className="pt-1 flex-1">
                <p className={`text-lg font-bold leading-none ${isCurrent ? "text-cyan-400" : "text-white"}`}>{title}</p>
                <p className={`text-sm mt-1.5 text-slate-500`}>{desc}</p>
            </div>
        </div>
    );
}
