'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import AppHeader from '@/components/AppHeader';
import { PageHeader } from '@/components/ui/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { getUser } from '@/lib/auth';
import { getMedications, saveMedication, markDoseTaken, deleteMedication, type Medication } from '@/lib/healthData';

export default function MedicationPage() {
    const router = useRouter();
    const [user, setUser] = useState(getUser());
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [medications, setMedications] = useState<Medication[]>([]);
    const [isAddingMed, setIsAddingMed] = useState(false);
    const [newMed, setNewMed] = useState({
        name: '',
        dosage: '',
        frequency: '',
        startDate: new Date().toISOString().split('T')[0],
        reminderTime: '',
    });

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        setMedications(getMedications());
    }, [user, router]);

    const handleAddMedication = () => {
        if (!newMed.name || !newMed.dosage || !newMed.frequency) return;

        saveMedication(newMed);
        setMedications(getMedications());
        setIsAddingMed(false);
        setNewMed({
            name: '',
            dosage: '',
            frequency: '',
            startDate: new Date().toISOString().split('T')[0],
            reminderTime: '',
        });
    };

    const handleMarkTaken = (id: string) => {
        markDoseTaken(id);
        setMedications(getMedications());
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this medication?')) {
            deleteMedication(id);
            setMedications(getMedications());
        }
    };

    const getTodayDoses = (med: Medication) => {
        const today = new Date().toISOString().split('T')[0];
        return med.takenDoses.filter(dose => dose.startsWith(today)).length;
    };

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
                <AppHeader title="Medication Tracker" onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto p-6 relative">
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/5 rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
                    </div>

                    <div className="max-w-5xl mx-auto relative z-10">
                        <PageHeader
                            breadcrumbs={[
                                { label: 'Dashboard', href: '/dashboard' },
                                { label: 'Medication', href: '/medication' },
                            ]}
                            action={
                                <button
                                    onClick={() => setIsAddingMed(true)}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                                >
                                    <span className="material-symbols-outlined">add</span>
                                    Add Medication
                                </button>
                            }
                        />

                        {medications.length === 0 ? (
                            <GlassCard className="p-12">
                                <EmptyState
                                    icon="medication"
                                    title="No medications yet"
                                    description="Start tracking your medications to stay on top of your health routine."
                                    action={{
                                        label: 'Add First Medication',
                                        onClick: () => setIsAddingMed(true),
                                    }}
                                />
                            </GlassCard>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {medications.map((med) => {
                                    const todayDoses = getTodayDoses(med);
                                    return (
                                        <GlassCard key={med.id} className="p-6" hover>
                                            <div className="flex items-start gap-4">
                                                <div className="size-14 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <span className="material-symbols-outlined text-white !text-2xl">pill</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-white text-lg">{med.name}</h3>
                                                            <p className="text-white/60 text-sm">{med.dosage} • {med.frequency}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => handleMarkTaken(med.id)}
                                                                className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-semibold hover:bg-emerald-500/30 transition-all flex items-center gap-1"
                                                            >
                                                                <span className="material-symbols-outlined !text-sm">check</span>
                                                                Mark Taken
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(med.id)}
                                                                className="text-white/60 hover:text-red-400 transition-colors"
                                                            >
                                                                <span className="material-symbols-outlined !text-lg">delete</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                                                        <div className="flex items-center gap-1">
                                                            <span className="material-symbols-outlined !text-sm">calendar_today</span>
                                                            Started {med.startDate}
                                                        </div>
                                                        {med.reminderTime && (
                                                            <div className="flex items-center gap-1">
                                                                <span className="material-symbols-outlined !text-sm">alarm</span>
                                                                {med.reminderTime}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                                                            <div
                                                                className="bg-gradient-to-r from-cyan-400 to-blue-600 h-full transition-all"
                                                                style={{ width: `${Math.min((todayDoses / 3) * 100, 100)}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-white/70 text-sm font-semibold">
                                                            {todayDoses} doses today
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <Modal
                        isOpen={isAddingMed}
                        onClose={() => setIsAddingMed(false)}
                        title="Add Medication"
                        size="md"
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-white/90 mb-2">Medication Name *</label>
                                <input
                                    type="text"
                                    value={newMed.name}
                                    onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                                    placeholder="e.g., Lisinopril"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-white/90 mb-2">Dosage *</label>
                                    <input
                                        type="text"
                                        value={newMed.dosage}
                                        onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                                        placeholder="e.g., 10mg"
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-white/90 mb-2">Frequency *</label>
                                    <select
                                        value={newMed.frequency}
                                        onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                    >
                                        <option value="">Select...</option>
                                        <option value="daily">Daily</option>
                                        <option value="twice daily">Twice Daily</option>
                                        <option value="three times daily">Three Times Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="as needed">As Needed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-white/90 mb-2">Start Date *</label>
                                    <input
                                        type="date"
                                        value={newMed.startDate}
                                        onChange={(e) => setNewMed({ ...newMed, startDate: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-white/90 mb-2">Reminder Time</label>
                                    <input
                                        type="time"
                                        value={newMed.reminderTime}
                                        onChange={(e) => setNewMed({ ...newMed, reminderTime: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleAddMedication}
                                disabled={!newMed.name || !newMed.dosage || !newMed.frequency}
                                className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add Medication
                            </button>
                        </div>
                    </Modal>
                </main>
            </div>
        </div>
    );
}
