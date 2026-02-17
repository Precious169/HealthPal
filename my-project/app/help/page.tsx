'use client';

import { PageHeader } from '@/components/ui/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';

export default function HelpPage() {
    const categories = [
        { icon: 'account_circle', title: 'Account & Security', desc: 'Manage your profile and privacy settings' },
        { icon: 'medical_services', title: 'Consultations', desc: 'How telemedicine and appointments work' },
        { icon: 'database', title: 'Health Records', desc: 'Syncing and managing your medical data' },
        { icon: 'payments', title: 'Billing & Plans', desc: 'Information about insurance and payments' }
    ];

    return (
        <div className="min-h-screen bg-[#0a192f] p-6 text-white font-display">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Help Center"
                    subtitle="Find answers to common questions or reach out to support"
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Help Center', href: '/help' },
                    ]}
                />

                <div className="mt-12 mb-16">
                    <div className="relative max-w-2xl mx-auto mb-16">
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pl-14 text-lg text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                            placeholder="Search for help..."
                        />
                        <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-white/30">search</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat, idx) => (
                            <GlassCard key={idx} className="p-8 border-white/5 text-center group" hover>
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-cyan-400 !text-3xl">{cat.icon}</span>
                                </div>
                                <h3 className="font-bold mb-2">{cat.title}</h3>
                                <p className="text-white/40 text-xs leading-relaxed">{cat.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                <div className="mt-24 mb-24">
                    <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <FaqItem question="Is my health data secure on HealthPal?" answer="Yes, we use AES-256 bit encryption and are fully HIPAA compliant. Your data is encrypted both in transit and at rest." />
                        <FaqItem question="How do I share my records with a doctor?" answer="You can generate a secure temporary link or a QR code from your 'Records' section to show any practitioner." />
                        <FaqItem question="Can I use HealthPal without insurance?" answer="Absolutely. HealthPal is a platform for your data. Telemedicine consultations may have out-of-pocket costs if not covered." />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
    return (
        <GlassCard className="p-6 border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold">{question}</h4>
                <span className="material-symbols-outlined text-white/20 group-hover:text-cyan-400 transition-colors">add</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">{answer}</p>
        </GlassCard>
    );
}
