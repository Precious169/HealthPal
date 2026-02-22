'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0a192f] p-6 text-white font-display">
            <div className="max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors mb-8 group">
                    <span className="material-symbols-outlined !text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Back to Home
                </Link>
                <PageHeader
                    title="About HealthPal"
                    subtitle="Empowering humanity through intelligent healthcare technology"
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'About', href: '/about' },
                    ]}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
                            We're on a mission to <span className="text-cyan-400">democratize</span> health data.
                        </h2>
                        <p className="text-lg text-white/60 leading-relaxed">
                            Founded in 2024, HealthPal was born out of a simple realization: the most important data in your life—your health history—is often the hardest to access and manage.
                        </p>
                        <p className="text-lg text-white/60 leading-relaxed">
                            We've built an intelligent, secure, and user-centric platform that puts you back in the driver's seat of your healthcare journey.
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-8">
                            <div>
                                <h4 className="text-3xl font-black text-white">50K+</h4>
                                <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Active Users</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-black text-white">99.9%</h4>
                                <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Data Privacy</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 blur-[100px] rounded-full"></div>
                        <GlassCard className="p-2 border-white/20 relative z-10 overflow-hidden rounded-[3rem]">
                            <img
                                src="https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=1200"
                                alt="Medical Tech"
                                className="w-full h-auto rounded-[2.5rem] opacity-80"
                            />
                        </GlassCard>
                    </div>
                </div>

                <div className="mt-32 space-y-12 mb-24">
                    <h3 className="text-3xl font-bold text-center">Our Core Values</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <GlassCard className="p-8 border-white/10" hover>
                            <span className="material-symbols-outlined text-cyan-400 !text-4xl mb-6">security</span>
                            <h4 className="text-xl font-bold mb-4">Security First</h4>
                            <p className="text-white/50 text-sm leading-relaxed">Your data is encrypted end-to-end. We never sell your personal information—period.</p>
                        </GlassCard>
                        <GlassCard className="p-8 border-white/10" hover>
                            <span className="material-symbols-outlined text-blue-400 !text-4xl mb-6">diversity_3</span>
                            <h4 className="text-xl font-bold mb-4">Inclusive Care</h4>
                            <p className="text-white/50 text-sm leading-relaxed">Breaking down barriers to healthcare access for every individual, regardless of location.</p>
                        </GlassCard>
                        <GlassCard className="p-8 border-white/10" hover>
                            <span className="material-symbols-outlined text-purple-400 !text-4xl mb-6">auto_awesome</span>
                            <h4 className="text-xl font-bold mb-4">Innovation</h4>
                            <p className="text-white/50 text-sm leading-relaxed">Leveraging AI to provide insights that help you live a healthier, longer life.</p>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
