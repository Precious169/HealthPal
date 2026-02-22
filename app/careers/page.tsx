'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';

const jobs = [
    {
        title: "Senior Full Stack Engineer",
        department: "Engineering",
        location: "Remote / New York",
        type: "Full-time"
    },
    {
        title: "Medical Data Scientist",
        department: "AI & Research",
        location: "Remote",
        type: "Full-time"
    },
    {
        title: "Product Designer (UI/UX)",
        department: "Design",
        location: "Remote / London",
        type: "Contract"
    },
    {
        title: "Customer Success Manager",
        department: "Operations",
        location: "San Francisco",
        type: "Full-time"
    }
];

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-[#0a192f] p-6 text-white font-display">
            <div className="max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors mb-8 group">
                    <span className="material-symbols-outlined !text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Back to Home
                </Link>
                <PageHeader
                    title="Join the Mission"
                    subtitle="Help us build the future of intelligent, patient-centric healthcare"
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Careers', href: '/careers' },
                    ]}
                />

                <div className="mt-16 mb-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1">
                        <h2 className="text-3xl font-bold mb-6 italic">Work with <span className="text-cyan-400">purpose</span>.</h2>
                        <p className="text-white/60 mb-8 leading-relaxed">
                            At HealthPal, we don't just write code or analyze data. We build systems that save time for doctors and lives for patients.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-sm font-bold text-white/80">
                                <span className="material-symbols-outlined text-cyan-400 !text-lg">check_circle</span>
                                Fully Remote Options
                            </li>
                            <li className="flex items-center gap-3 text-sm font-bold text-white/80">
                                <span className="material-symbols-outlined text-cyan-400 !text-lg">check_circle</span>
                                Comprehensive Health Plans
                            </li>
                            <li className="flex items-center gap-3 text-sm font-bold text-white/80">
                                <span className="material-symbols-outlined text-cyan-400 !text-lg">check_circle</span>
                                Equity & Performance Bonuses
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xl font-bold mb-6">Open Positions</h3>
                        {jobs.map((job, idx) => (
                            <GlassCard key={idx} className="p-6 border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 group" hover>
                                <div>
                                    <h4 className="text-lg font-bold group-hover:text-cyan-400 transition-colors">{job.title}</h4>
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{job.department} • {job.location}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="hidden md:block text-xs font-bold text-white/20 uppercase tracking-tighter">{job.type}</span>
                                    <button className="bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
                                        Apply Now
                                    </button>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
