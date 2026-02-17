"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import AppHeader from "@/components/AppHeader";
import { getUser } from "@/lib/auth";

export default function SettingsPage() {
    const [user, setUser] = useState(getUser());

    if (!user) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-900">
                <span className="material-symbols-outlined animate-spin text-cyan-400 !text-5xl">progress_activity</span>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-900 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AppHeader />
                <main className="flex-1 overflow-y-auto p-8 relative">
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/5 rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
                    </div>

                    <div className="max-w-4xl mx-auto relative z-10">
                        {/* Page Title */}
                        <header className="mb-10">
                            <h1 className="text-4xl font-bold font-heading tracking-tight text-white">Settings</h1>
                            <p className="text-slate-400 mt-2">Manage your account preferences and security settings.</p>
                        </header>

                        <div className="space-y-8 pb-12">
                            {/* Profile Information Section */}
                            <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                <h2 className="text-xl font-bold mb-8 flex items-center gap-2 relative z-10">
                                    <span className="material-symbols-outlined text-cyan-400">person</span>
                                    Profile Information
                                </h2>
                                <div className="flex flex-col md:flex-row gap-10 items-start mb-10 pb-8 border-b border-white/5 relative z-10">
                                    <div className="relative group shrink-0">
                                        <div className="size-28 rounded-2xl bg-white/5 overflow-hidden bg-cover bg-center border-4 border-white/10 shadow-md"
                                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIRc_8Gz0V8joMJCGtum9ICtCdNma-b9N7Zn9ZDMlcb_jN9bE40YVzQSHChr4tfS1dB0b3IWMAYBJGtGhC44lXb33K2CLZO6yTvCeBtbVzX9Fsj0dU8UVpXo6FPt8s1ErPhZlq1os4_Aa-16UW0sESpwZUDFSsHn5HqA6sFurcUBtxyIg9Sw_fZgS_PKOspdH3xQ3-LDKQ5gf89Mi7TO72zYMljv94-r-cUNKGQOWo3BDFGUAj1cEifa4xCmBuKLP5IIB9PvDqCU0')" }}></div>
                                        <button className="absolute -bottom-2 -right-2 bg-cyan-500 text-white p-2 rounded-xl shadow-lg hover:scale-105 transition-transform">
                                            <span className="material-symbols-outlined !text-sm">edit</span>
                                        </button>
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <h3 className="text-lg font-bold text-white">Profile Photo</h3>
                                        <p className="text-sm text-slate-400 max-w-sm">Update your photo for a personalized experience. Supported formats: JPG, PNG.</p>
                                        <div className="flex gap-3 pt-2">
                                            <button className="px-5 py-2.5 bg-cyan-500 text-white text-sm font-bold rounded-xl hover:brightness-105 transition-all">Upload New</button>
                                            <button className="px-5 py-2.5 bg-white/5 border border-white/10 text-slate-400 text-sm font-bold rounded-xl hover:bg-white/10 transition-all">Remove</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                    <InputGroup label="Full Name" value={user.name} />
                                    <InputGroup label="Email Address" value={user.email} type="email" />
                                    <InputGroup label="Phone Number" value="+1 (555) 882-1920" type="tel" />
                                    <InputGroup label="Date of Birth" value="1992-04-15" type="date" />
                                </div>
                            </section>

                            {/* Security Section */}
                            <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                                <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-cyan-400">security</span>
                                    Security & Privacy
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-5 border border-white/5 rounded-2xl bg-white/5">
                                        <div>
                                            <span className="font-bold block text-white">Master Password</span>
                                            <span className="text-sm text-slate-500">Last changed 3 months ago</span>
                                        </div>
                                        <button className="px-5 py-2.5 border border-cyan-500 text-cyan-400 text-sm font-bold rounded-xl hover:bg-cyan-500 hover:text-white transition-all">Change Password</button>
                                    </div>
                                    <div className="flex items-center justify-between p-2">
                                        <div className="flex flex-col max-w-[70%]">
                                            <span className="font-bold text-white">Two-Factor Authentication</span>
                                            <span className="text-sm text-slate-500 mt-1">Add an extra layer of security to your account by requiring a code from your phone.</span>
                                        </div>
                                        <Toggle checked />
                                    </div>
                                </div>
                            </section>

                            {/* Notifications Section */}
                            <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                                <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-cyan-400">notifications</span>
                                    Notifications
                                </h2>
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Appointment Reminders</h3>
                                        <div className="space-y-5">
                                            <NotificationToggle label="Email Notifications" checked />
                                            <NotificationToggle label="Sms Notifications" />
                                            <NotificationToggle label="Push Notifications" checked />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Health Log Alerts</h3>
                                        <div className="space-y-5">
                                            <NotificationToggle label="Vitals Reminder" checked />
                                            <NotificationToggle label="Medication Dose Alerts" checked />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Save Buttons */}
                            <div className="flex justify-end gap-4 pt-4">
                                <button className="px-8 py-3.5 bg-white/5 text-slate-400 font-bold rounded-xl hover:bg-white/10 transition-all">Discard Changes</button>
                                <button className="px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:brightness-105 transition-all">Save All Changes</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function InputGroup({ label, value, type = "text" }: any) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{label}</label>
            <input
                type={type}
                defaultValue={value}
                className="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm font-medium"
            />
        </div>
    );
}

function Toggle({ checked }: { checked?: boolean }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked={checked} />
            <div className="w-12 h-6.5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
    );
}

function NotificationToggle({ label, checked }: { label: string; checked?: boolean }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{label}</span>
            <Toggle checked={checked} />
        </div>
    );
}
