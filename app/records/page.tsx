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
import { getRecords, saveRecord, deleteRecord, type MedicalRecord } from '@/lib/healthData';

export default function RecordsPage() {
    const router = useRouter();
    const [user, setUser] = useState(getUser());
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [records, setRecords] = useState<MedicalRecord[]>([]);
    const [isAddingRecord, setIsAddingRecord] = useState(false);
    const [filter, setFilter] = useState<'all' | MedicalRecord['type']>('all');
    const [newRecord, setNewRecord] = useState({
        title: '',
        type: 'lab' as MedicalRecord['type'],
        date: new Date().toISOString().split('T')[0],
        status: '',
        notes: '',
    });

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        setRecords(getRecords());
    }, [user, router]);

    const handleAddRecord = () => {
        if (!newRecord.title || !newRecord.status) return;

        saveRecord(newRecord);
        setRecords(getRecords());
        setIsAddingRecord(false);
        setNewRecord({
            title: '',
            type: 'lab',
            date: new Date().toISOString().split('T')[0],
            status: '',
            notes: '',
        });
    };

    const handleDeleteRecord = (id: string) => {
        if (confirm('Are you sure you want to delete this record?')) {
            deleteRecord(id);
            setRecords(getRecords());
        }
    };

    const filteredRecords = filter === 'all' ? records : records.filter(r => r.type === filter);

    const getTypeIcon = (type: MedicalRecord['type']) => {
        const icons = {
            lab: 'science',
            imaging: 'radiology',
            visit: 'stethoscope',
            prescription: 'medication',
        };
        return icons[type];
    };

    const getTypeColor = (type: MedicalRecord['type']) => {
        const colors = {
            lab: 'from-cyan-400 to-blue-600',
            imaging: 'from-purple-400 to-pink-600',
            visit: 'from-emerald-400 to-teal-600',
            prescription: 'from-orange-400 to-red-600',
        };
        return colors[type];
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
                <AppHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto p-6 relative">
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/5 rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <PageHeader
                            title="Medical Records"
                            subtitle="Securely store and access all your health documents in one place"
                            breadcrumbs={[
                                { label: 'Dashboard', href: '/dashboard' },
                                { label: 'Records', href: '/records' },
                            ]}
                            action={
                                <button
                                    onClick={() => setIsAddingRecord(true)}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                                >
                                    <span className="material-symbols-outlined">add</span>
                                    Add Record
                                </button>
                            }
                        />

                        {/* Filter Tabs */}
                        <div className="mb-6">
                            <div className="flex gap-3 flex-wrap">
                                {[
                                    { key: 'all', label: 'All Records' },
                                    { key: 'lab', label: 'Lab Results' },
                                    { key: 'imaging', label: 'Imaging' },
                                    { key: 'visit', label: 'Visit Summaries' },
                                    { key: 'prescription', label: 'Prescriptions' },
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setFilter(tab.key as typeof filter)}
                                        className={`px-4 py-2 rounded-xl font-semibold transition-all ${filter === tab.key
                                            ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                                            : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Records List */}
                        {filteredRecords.length === 0 ? (
                            <GlassCard className="p-12">
                                <EmptyState
                                    icon="folder_open"
                                    title="No records found"
                                    description="Start building your health history by adding your first medical record."
                                    action={{
                                        label: 'Add First Record',
                                        onClick: () => setIsAddingRecord(true),
                                    }}
                                />
                            </GlassCard>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {filteredRecords.map((record) => (
                                    <GlassCard key={record.id} className="p-6" hover>
                                        <div className="flex items-start gap-4">
                                            <div className={`size-14 bg-gradient-to-br ${getTypeColor(record.type)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                                <span className="material-symbols-outlined text-white !text-2xl">{getTypeIcon(record.type)}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-bold text-white text-lg">{record.title}</h3>
                                                        <p className="text-white/60 text-sm capitalize">{record.type.replace('_', ' ')}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold">
                                                            {record.status}
                                                        </span>
                                                        <button
                                                            onClick={() => handleDeleteRecord(record.id)}
                                                            className="text-white/60 hover:text-red-400 transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined !text-lg">delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                                                    <div className="flex items-center gap-1">
                                                        <span className="material-symbols-outlined !text-sm">calendar_today</span>
                                                        {record.date}
                                                    </div>
                                                </div>
                                                {record.notes && (
                                                    <p className="text-white/70 text-sm">{record.notes}</p>
                                                )}
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Add Record Modal */}
                    <Modal
                        isOpen={isAddingRecord}
                        onClose={() => setIsAddingRecord(false)}
                        title="Add Medical Record"
                        size="md"
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-white/90 mb-2">Record Title *</label>
                                <input
                                    type="text"
                                    value={newRecord.title}
                                    onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })}
                                    placeholder="e.g., Annual Physical Exam"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white/90 mb-2">Record Type *</label>
                                <select
                                    value={newRecord.type}
                                    onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value as MedicalRecord['type'] })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                >
                                    <option value="lab" className="bg-slate-900 text-white">Lab Results</option>
                                    <option value="imaging" className="bg-slate-900 text-white">Imaging</option>
                                    <option value="visit" className="bg-slate-900 text-white">Visit Summary</option>
                                    <option value="prescription" className="bg-slate-900 text-white">Prescription</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white/90 mb-2">Date *</label>
                                <input
                                    type="date"
                                    value={newRecord.date}
                                    onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white/90 mb-2">Status *</label>
                                <input
                                    type="text"
                                    value={newRecord.status}
                                    onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value })}
                                    placeholder="e.g., Normal, Pending Review"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white/90 mb-2">Notes (Optional)</label>
                                <textarea
                                    value={newRecord.notes}
                                    onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                                    placeholder="Additional details or observations..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                />
                            </div>

                            <button
                                onClick={handleAddRecord}
                                disabled={!newRecord.title || !newRecord.status}
                                className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add Record
                            </button>
                        </div>
                    </Modal>
                </main>
            </div>
        </div>
    );
}
