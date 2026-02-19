'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { FormInput } from '@/components/auth/FormInput';

export default function SalesPage() {
    const [form, setForm] = useState({ name: '', email: '', company: '', size: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#0a192f] flex items-center justify-center px-6">
                <GlassCard className="max-w-md w-full p-12 text-center border-white/10">
                    <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-cyan-400">
                        <span className="material-symbols-outlined !text-4xl">check_circle</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Request Received</h1>
                    <p className="text-white/60 mb-8">Our enterprise solutions team will reach out to you within 24 hours.</p>
                    <Link href="/" className="inline-block bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-cyan-400 transition-all">
                        Back to Home
                    </Link>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a192f] text-white py-24 px-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors mb-12 group">
                    <span className="material-symbols-outlined !text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Back to Home
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h1 className="text-5xl font-bold font-heading mb-6 leading-tight">
                            Scale Your <span className="text-cyan-400">Health Innovation</span>
                        </h1>
                        <p className="text-xl text-white/60 mb-12">
                            Join the world&apos;s leading healthcare providers using HealthPal to deliver superior patient outcomes.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
                                    <span className="material-symbols-outlined">security</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">HIPAA Compliance</h3>
                                    <p className="text-white/40 text-sm">Enterprise-grade security and data protection protocols.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                                    <span className="material-symbols-outlined">api</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Custom Integration</h3>
                                    <p className="text-white/40 text-sm">Seamlessly connect with your existing EHR and lab systems.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-purple-400 shrink-0">
                                    <span className="material-symbols-outlined">analytics</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Population Analytics</h3>
                                    <p className="text-white/40 text-sm">Advanced dashboards for managing large patient cohorts.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <GlassCard className="p-8 border-white/10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormInput
                                label="Full Name"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={(v) => setForm({ ...form, name: v })}
                                required
                            />
                            <FormInput
                                label="Work Email"
                                type="email"
                                placeholder="john@company.com"
                                value={form.email}
                                onChange={(v) => setForm({ ...form, email: v })}
                                required
                            />
                            <FormInput
                                label="Company / Institution"
                                placeholder="Mayo Clinic"
                                value={form.company}
                                onChange={(v) => setForm({ ...form, company: v })}
                                required
                            />
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-white/90">
                                    Estimated Users
                                </label>
                                <select
                                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:border-cyan-400/50"
                                    value={form.size}
                                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                                >
                                    <option value="" className="bg-[#0a192f]">Select a range</option>
                                    <option value="1-50" className="bg-[#0a192f]">1-50 practitioners</option>
                                    <option value="51-500" className="bg-[#0a192f]">51-500 practitioners</option>
                                    <option value="500+" className="bg-[#0a192f]">500+ practitioners</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-white/90">
                                    How can we help?
                                </label>
                                <textarea
                                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:border-cyan-400/50 min-h-[120px]"
                                    placeholder="Tell us about your organization's needs..."
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-cyan-500 text-white py-4 rounded-xl font-black text-lg hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Sending Request...' : 'Submit Inquiry'}
                            </button>
                        </form>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
