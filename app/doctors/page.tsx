'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';

const doctors = [
    {
        name: "Dr. Sarah Mitchell",
        role: "Chief Medical Officer",
        specialty: "Cardiology",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
        bio: "Former Head of Cardiology at Mayo Clinic with 20+ years of experience in preventive care."
    },
    {
        name: "Dr. James Wilson",
        role: "Head of General Practice",
        specialty: "Family Medicine",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
        bio: "Dedicated to providing comprehensive healthcare for families and individuals in the digital age."
    },
    {
        name: "Dr. Elena Rodriguez",
        role: "Director of Mental Health",
        specialty: "Psychiatry",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800",
        bio: "Expert in holistic mental health approaches and integrated behavioral therapy."
    },
    {
        name: "Dr. Michael Chen",
        role: "Lead Endocrinologist",
        specialty: "Metabolic Health",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
        bio: "Specializes in diabetic management and long-term endocrine wellness through data tracking."
    }
];

export default function DoctorsPage() {
    return (
        <div className="min-h-screen bg-[#0a192f] p-4 sm:p-6 md:p-8 text-white font-display">
            <div className="max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors mb-8 group">
                    <span className="material-symbols-outlined !text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Back to Home
                </Link>
                <PageHeader
                    title="Our Medical Experts"
                    subtitle="World-class specialists dedicated to your digital healthcare journey"
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Doctors', href: '/doctors' },
                    ]}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 mb-24">
                    {doctors.map((doc, idx) => (
                        <GlassCard key={idx} className="p-0 border-white/10 overflow-hidden group" hover>
                            <div className="h-64 relative overflow-hidden">
                                <img
                                    src={doc.image}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                    alt={doc.name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent"></div>
                            </div>
                            <div className="p-5 md:p-6">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold">{doc.name}</h3>
                                    <p className="text-cyan-400 text-xs font-black uppercase tracking-widest">{doc.specialty}</p>
                                </div>
                                <p className="text-white/40 text-sm leading-relaxed mb-6">
                                    {doc.bio}
                                </p>
                                <Link
                                    href="/telemedicine"
                                    className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-cyan-400 transition-colors uppercase tracking-widest"
                                >
                                    Book Consultation
                                    <span className="material-symbols-outlined !text-sm">arrow_forward</span>
                                </Link>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                <div className="py-24 border-t border-white/5 text-center">
                    <h2 className="text-3xl font-bold mb-8">Join Our Network</h2>
                    <p className="text-white/60 max-w-2xl mx-auto mb-12">
                        Are you a licensed medical professional looking to transform how care is delivered? We're always looking for brilliant minds to join our mission.
                    </p>
                    <Link href="/careers" className="bg-white/5 border border-white/10 px-10 py-4 rounded-2xl font-black hover:bg-white/10 transition-all active:scale-95 inline-block">
                        View Open Positions
                    </Link>
                </div>
            </div>
        </div>
    );
}
