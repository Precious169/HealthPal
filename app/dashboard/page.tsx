"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/Sidebar";
import AppHeader from "@/components/AppHeader";
import Link from "next/link";
import { getUser, logout, saveOnboardingData, type User } from '@/lib/auth';
import { Modal } from "@/components/ui/Modal";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [updateModal, setUpdateModal] = useState({ open: false, type: '', label: '', unit: '' });
    const [updateValue, setUpdateValue] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

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

    const handleUpdateVital = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!updateValue || !user) return;

        setIsUpdating(true);
        // Simulate API call
        setTimeout(() => {
            const currentVitals = user.onboarding?.vitals || {};
            const updatedVitals = {
                ...currentVitals,
                [updateModal.type]: updateValue
            };

            saveOnboardingData({ vitals: updatedVitals });
            
            // Get the updated user from storage to sync state
            const updatedUser = getUser();
            if (updatedUser) {
                setUser(updatedUser);
            }

            setIsUpdating(false);
            setUpdateModal({ ...updateModal, open: false });
            setUpdateValue('');
        }, 800);
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
                    title={`Welcome back, ${user?.name || 'User'}!`}
                    subtitle="Here's what's happening with your health today."
                    onMenuClick={() => setIsSidebarOpen(true)}
                    showBook={true}
                />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 relative scroll-smooth">
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/5 rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        {/* Logout button removed as per requirements */}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column (Main Stats) */}
                            <div className="lg:col-span-2 space-y-8">
                                {user?.isDemo ? (
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
                                ) : (
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center shadow-sm">
                                        <div className="flex items-center gap-5">
                                            <div className="size-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-500 shadow-sm">
                                                <span className="material-symbols-outlined !text-3xl">videocam_off</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-white">No Upcoming Consultations</h3>
                                                <p className="text-slate-500">Stay on top of your health journey.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Vital Signs Grid */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            <span className="material-symbols-outlined text-cyan-400">monitoring</span>
                                            Daily Health Check-in
                                        </h3>
                                        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Update your vitals daily</p>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                                    <VitalCard
                                        label="Heart Rate"
                                        value={user?.onboarding?.vitals?.heartRate || (user?.isDemo ? "72" : "--")}
                                        unit="bpm"
                                        icon="favorite"
                                        color="text-red-500"
                                        onUpdate={() => {
                                            setUpdateModal({ open: true, type: 'heartRate', label: 'Heart Rate', unit: 'bpm' });
                                            setUpdateValue(user?.onboarding?.vitals?.heartRate || '');
                                        }}
                                    />
                                    <VitalCard
                                        label="Blood Pressure"
                                        value={user?.onboarding?.vitals?.bloodPressure || (user?.isDemo ? "120/80" : "--")}
                                        unit="mmHg"
                                        icon="blood_pressure"
                                        color="text-cyan-400"
                                        onUpdate={() => {
                                            setUpdateModal({ open: true, type: 'bloodPressure', label: 'Blood Pressure', unit: 'mmHg' });
                                            setUpdateValue(user?.onboarding?.vitals?.bloodPressure || '');
                                        }}
                                    />
                                    <VitalCard
                                        label="Sleep"
                                        value={user?.onboarding?.vitals?.sleep || (user?.isDemo ? "7.5" : "0")}
                                        unit="hrs"
                                        icon="bedtime"
                                        color="text-indigo-500"
                                        onUpdate={() => {
                                            setUpdateModal({ open: true, type: 'sleep', label: 'Sleep', unit: 'hrs' });
                                            setUpdateValue(user?.onboarding?.vitals?.sleep || '');
                                        }}
                                    />
                                    <VitalCard
                                        label="Steps"
                                        value={user?.onboarding?.vitals?.steps || (user?.isDemo ? "8,432" : "0")}
                                        unit="steps"
                                        icon="directions_walk"
                                        color="text-emerald-500"
                                        onUpdate={() => {
                                            setUpdateModal({ open: true, type: 'steps', label: 'Steps', unit: 'steps' });
                                            setUpdateValue(user?.onboarding?.vitals?.steps || '');
                                        }}
                                    />
                                </div>
                                </div>

                                {/* Health Records Preview */}
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-8 shadow-sm">
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
                                    <Link href="/medication" className="w-full mt-6 py-3 border-2 border-dashed border-white/10 rounded-xl text-slate-400 text-sm font-bold hover:border-cyan-500/50 hover:text-cyan-400 transition-all flex items-center justify-center">
                                        + Add Medication
                                    </Link>
                                </div>

                                {user?.isDemo ? (
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
                                ) : (
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-white/60 shadow-sm">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="material-symbols-outlined text-slate-500">monitoring</span>
                                            <h3 className="font-bold text-lg text-white">Treatment Plans</h3>
                                        </div>
                                        <p className="text-sm italic leading-relaxed">No active treatment plans found. Consult with our experts to create your roadmap.</p>
                                        <Link href="/treatment" className="inline-block mt-4 text-sm font-bold text-cyan-400 hover:underline">Explore Plans →</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Update Vital Modal */}
            <Modal
                isOpen={updateModal.open}
                onClose={() => setUpdateModal({ ...updateModal, open: false })}
                title={`Update ${updateModal.label}`}
                size="sm"
            >
                <form onSubmit={handleUpdateVital} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-white/70 ml-1">New Value ({updateModal.unit})</label>
                        <input
                            type="text"
                            autoFocus
                            placeholder={`Enter ${updateModal.label}...`}
                            value={updateValue}
                            onChange={(e) => setUpdateValue(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/10 transition-all"
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setUpdateModal({ ...updateModal, open: false })}
                            className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUpdating || !updateValue}
                            className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50"
                        >
                            {isUpdating ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

function VitalCard({ label, value, unit, icon, color, onUpdate }: { label: string; value: string; unit: string; icon: string; color: string; onUpdate: () => void }) {
    return (
        <div className="bg-white/5 border border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm group hover:border-cyan-500/30 transition-all relative overflow-hidden">
            <div className={`size-10 ${color.replace('text-', 'bg-').replace('400', '400/10').replace('500', '500/10')} ${color} rounded-lg flex items-center justify-center mb-4`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            
            <button 
                onClick={onUpdate}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 size-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:bg-white/20 transition-all"
                title="Update"
            >
                <span className="material-symbols-outlined !text-lg">edit</span>
            </button>

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
