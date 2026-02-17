'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { getUser } from '@/lib/auth';
import { getLabResults, saveLabResult, type LabResult } from '@/lib/healthData';
import Sidebar from '@/components/Sidebar';
import AppHeader from '@/components/AppHeader';

export default function LabResultsPage() {
    const router = useRouter();
    const [user, setUser] = useState(getUser());
    const [results, setResults] = useState<LabResult[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newResult, setNewResult] = useState({
        testName: '',
        date: new Date().toISOString().split('T')[0],
        value: '',
        unit: '',
        normalMin: '',
        normalMax: '',
    });

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        setResults(getLabResults());
    }, [user, router]);

    const handleAddResult = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newResult.testName || !newResult.value || !newResult.unit) return;

        const val = parseFloat(newResult.value);
        const min = parseFloat(newResult.normalMin);
        const max = parseFloat(newResult.normalMax);

        let status: LabResult['status'] = 'normal';
        if (val < min) status = 'low';
        else if (val > max) status = 'high';

        saveLabResult({
            testName: newResult.testName,
            date: newResult.date,
            value: val,
            unit: newResult.unit,
            normalRange: { min, max },
            status,
        });

        setResults(getLabResults());
        setIsAdding(false);
        setNewResult({
            testName: '',
            date: new Date().toISOString().split('T')[0],
            value: '',
            unit: '',
            normalMin: '',
            normalMax: '',
        });
    };

    const getStatusStyles = (status: LabResult['status']) => {
        switch (status) {
            case 'high': return 'bg-red-500/20 text-red-400 border-red-500/20';
            case 'low': return 'bg-orange-500/20 text-orange-400 border-orange-500/20';
            default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20';
        }
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
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AppHeader />
                <main className="flex-1 overflow-y-auto p-6 relative">
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/5 rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <PageHeader
                            title="Lab Results"
                            subtitle="Track and analyze your clinical test results over time"
                            breadcrumbs={[
                                { label: 'Dashboard', href: '/dashboard' },
                                { label: 'Lab Results', href: '/lab-results' },
                            ]}
                            action={
                                <button
                                    onClick={() => setIsAdding(true)}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                                >
                                    <span className="material-symbols-outlined">add</span>
                                    Add Result
                                </button>
                            }
                        />

                        {results.length === 0 ? (
                            <GlassCard className="p-12 border-white/10">
                                <EmptyState
                                    icon="science"
                                    title="No lab results yet"
                                    description="Start tracking your health data by adding your first test result."
                                    action={{
                                        label: 'Upload First Result',
                                        onClick: () => setIsAdding(true),
                                    }}
                                />
                            </GlassCard>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {results.map((result) => (
                                    <GlassCard key={result.id} className="p-6 border-white/10 hover:border-cyan-500/30 transition-all group" hover>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="bg-white/5 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-cyan-400 !text-3xl">science</span>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(result.status)}`}>
                                                {result.status}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold mb-1">{result.testName}</h3>
                                        <p className="text-white/40 text-xs mb-6 uppercase tracking-widest font-bold">{result.date}</p>

                                        <div className="flex items-baseline gap-2 mb-6">
                                            <span className="text-4xl font-black">{result.value}</span>
                                            <span className="text-white/40 font-bold">{result.unit}</span>
                                        </div>

                                        <div className="space-y-3 pt-6 border-t border-white/5">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-white/40 font-medium">Normal Range</span>
                                                <span className="font-bold">{result.normalRange.min} - {result.normalRange.max} {result.unit}</span>
                                            </div>

                                            {/* Visual Range Indicator */}
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                                                <div
                                                    className="absolute h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transition-all duration-1000"
                                                    style={{
                                                        left: `${Math.max(0, Math.min(100, (result.value / (result.normalRange.max * 1.2)) * 100))}%`,
                                                        width: '4px'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <Modal
                isOpen={isAdding}
                onClose={() => setIsAdding(false)}
                title="Add New Lab Result"
                size="md"
            >
                <form onSubmit={handleAddResult} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/60">Test Name</label>
                        <input
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                            placeholder="e.g. Blood Glucose"
                            value={newResult.testName}
                            onChange={e => setNewResult({ ...newResult, testName: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/60">Date</label>
                            <input
                                required
                                type="date"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                                value={newResult.date}
                                onChange={e => setNewResult({ ...newResult, date: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/60">Unit (e.g. mg/dL)</label>
                            <input
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                                value={newResult.unit}
                                onChange={e => setNewResult({ ...newResult, unit: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/60">Value</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                                value={newResult.value}
                                onChange={e => setNewResult({ ...newResult, value: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/60">Min Range</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                                value={newResult.normalMin}
                                onChange={e => setNewResult({ ...newResult, normalMin: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/60">Max Range</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                                value={newResult.normalMax}
                                onChange={e => setNewResult({ ...newResult, normalMax: e.target.value })}
                            />
                        </div>
                    </div>

                    <button className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl font-black text-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-[0.98]">
                        Save Lab Result
                    </button>
                </form>
            </Modal>
        </div>
    );
}