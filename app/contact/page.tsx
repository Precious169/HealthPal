'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { saveContactSubmission } from '@/lib/healthData';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            saveContactSubmission({
                ...form,
                type: 'general'
            });
            setIsSubmitting(false);
            setSubmitted(true);
            setForm({ name: '', email: '', subject: '', message: '' });
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#0a192f] p-6 text-white font-display">
            <div className="max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors mb-8 group">
                    <span className="material-symbols-outlined !text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Back to Home
                </Link>
                <PageHeader
                    title="Get In Touch"
                    subtitle="We're here to help you and your healthcare journey"
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Contact', href: '/contact' },
                    ]}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 mb-24">
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                            <p className="text-white/60 leading-relaxed mb-8">
                                Have questions about our platform? Our team is available to assist you with integration, clinical questions, or just a friendly chat.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <ContactInfo icon="mail" label="Email Us" text="support@healthpal.io" />
                            <ContactInfo icon="call" label="Call Us" text="+1 (888) HEALTH-PAL" />
                            <ContactInfo icon="location_on" label="Headquarters" text="221B Baker Street, London, NW1 6XE" />
                        </div>

                        <GlassCard className="p-6 border-cyan-500/20 bg-cyan-500/5">
                            <h4 className="text-sm font-black uppercase tracking-widest text-cyan-400 mb-2">Clinical Support</h4>
                            <p className="text-xs text-white/60">If you are a medical provider needing technical assistance, please use our 24/7 dedicated clinical line.</p>
                        </GlassCard>
                    </div>

                    <div className="lg:col-span-7">
                        <GlassCard className="p-8 border-white/10 relative overflow-hidden">
                            {submitted ? (
                                <div className="py-12 text-center space-y-6">
                                    <div className="bg-emerald-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="material-symbols-outlined text-emerald-400 !text-4xl">check_circle</span>
                                    </div>
                                    <h3 className="text-2xl font-bold">Message Received</h3>
                                    <p className="text-white/60">Thank you for Reaching out. Our team will get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-cyan-400 font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-white/60">Your Name</label>
                                            <input
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                                                placeholder="John Doe"
                                                value={form.name}
                                                onChange={e => setForm({ ...form, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-white/60">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                                                placeholder="john@example.com"
                                                value={form.email}
                                                onChange={e => setForm({ ...form, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/60">Subject</label>
                                        <input
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                                            placeholder="How can we help?"
                                            value={form.subject}
                                            onChange={e => setForm({ ...form, subject: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/60">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors resize-none"
                                            placeholder="Type your message here..."
                                            value={form.message}
                                            onChange={e => setForm({ ...form, message: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <button
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl font-black text-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactInfo({ icon, label, text }: { icon: string, label: string, text: string }) {
    return (
        <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{label}</p>
                <p className="font-bold">{text}</p>
            </div>
        </div>
    );
}
