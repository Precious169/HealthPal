"use client";

import { useState } from "react";

export default function AddMedicationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState(1);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 w-full max-w-[640px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-300">

                {/* Header */}
                <div className="px-8 pt-8 pb-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Add New Medication</h2>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <p className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Step {step} of 2: {step === 1 ? "Medication Details" : "Dosing Schedule"}</p>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-500" style={{ width: step === 1 ? "50%" : "100%" }}></div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-8 py-4 overflow-y-auto max-h-[70vh]">
                    {step === 1 ? (
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Search for medication name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined">search</span>
                                    </div>
                                    <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white transition-all outline-none" placeholder="e.g., Lisinopril, Metformin" />
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Common results: Lisinopril 10mg, Metformin 500mg...</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Dosage</label>
                                    <div className="flex shadow-sm rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                                        <input className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none focus:ring-0 text-slate-900 dark:text-white" placeholder="50" />
                                        <select className="bg-slate-100 dark:bg-slate-700 border-none text-sm font-bold focus:ring-0 px-4">
                                            <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">mg</option>
                                            <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">ml</option>
                                            <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">mcg</option>
                                            <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">units</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Form</label>
                                    <select defaultValue="" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl py-3 focus:ring-primary focus:border-primary text-slate-900 dark:text-white font-medium text-sm">
                                        <option value="" disabled className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Select form</option>
                                        <option value="Tablet" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Tablet</option>
                                        <option value="Capsule" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Capsule</option>
                                        <option value="Liquid" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Liquid</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Upload Prescription (Optional)</label>
                                <div className="border-2 border-dashed border-primary/20 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors p-10 text-center cursor-pointer group">
                                    <span className="material-symbols-outlined !text-4xl text-primary mb-3 block group-hover:scale-110 transition-transform">upload_file</span>
                                    <p className="text-sm font-bold text-primary">Click to upload or drag and drop</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">PNG, JPG or PDF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                    <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined">wb_sunny</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold">Morning Dose</p>
                                        <p className="text-xs text-slate-500">Scheduled for Breakfast</p>
                                    </div>
                                    <input type="time" defaultValue="08:00" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm font-bold" />
                                </div>
                                <button className="flex items-center gap-2 text-primary font-bold text-sm px-2">
                                    <span className="material-symbols-outlined !text-lg">add_circle</span> Add Another Dose
                                </button>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400">Preferences</h4>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold">Push Notifications</span>
                                    <div className="size-6 bg-primary rounded flex items-center justify-center text-white"><span className="material-symbols-outlined !text-sm font-black">check</span></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold">Refill Reminders</span>
                                    <div className="size-6 bg-primary rounded flex items-center justify-center text-white"><span className="material-symbols-outlined !text-sm font-black">check</span></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                    <button
                        onClick={step === 1 ? onClose : () => setStep(1)}
                        className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        {step === 1 ? "Cancel" : "Back"}
                    </button>
                    <button
                        onClick={step === 1 ? () => setStep(2) : onClose}
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2 transition-all active:scale-95"
                    >
                        {step === 1 ? "Next: Schedule" : "Add Medication"}
                        <span className="material-symbols-outlined !text-lg">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
