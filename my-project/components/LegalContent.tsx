'use client';

import { PageHeader } from '@/components/ui/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';

export default function LegalPage({ title, lastUpdated, sections }: { title: string, lastUpdated: string, sections: any[] }) {
    return (
        <div className="min-h-screen bg-[#0a192f] p-6 text-white font-display">
            <div className="max-w-4xl mx-auto">
                <PageHeader
                    title={title}
                    subtitle={`Last updated: ${lastUpdated}`}
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: 'Legal', href: '#' },
                        { label: title, href: '#' },
                    ]}
                />

                <div className="mt-12 space-y-12 mb-24">
                    {sections.map((sec, idx) => (
                        <div key={idx} className="space-y-4">
                            <h2 className="text-2xl font-black text-white italic tracking-tight">{idx + 1}. {sec.title}</h2>
                            <GlassCard className="p-8 border-white/5 bg-white/5 leading-relaxed text-white/70">
                                {sec.content}
                            </GlassCard>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Wrapper components for different legal pages
export function PrivacyPage() {
    const sections = [
        { title: "Information Collection", content: "We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This includes health data provided during use." },
        { title: "Data Storage", content: "All health data is stored securely using industry-standard encryption. We utilize strictly controlled database environments with regular security audits." },
        { title: "Your Rights", content: "You have the right to access, rectify, or delete your data at any time. Our 'Download Data' feature allows for easy portability of your health records." }
    ];
    return <LegalPage title="Privacy Policy" lastUpdated="Feb 12, 2024" sections={sections} />;
}

export function TermsPage() {
    const sections = [
        { title: "Acceptance of Terms", content: "By accessing and using HealthPal, you agree to be bound by these terms. If you do not agree, please do not use our services." },
        { title: "Prohibited Uses", content: "You may not use HealthPal for any illegal purposes or to transmit harmful code. Impersonating a medical professional is strictly prohibited." },
        { title: "Liability", content: "HealthPal is a data platform and does not provide medical advice. Consult with a qualified professional for health concerns." }
    ];
    return <LegalPage title="Terms of Service" lastUpdated="Jan 05, 2024" sections={sections} />;
}

export function HIPAAStatusPage() {
    const sections = [
        { title: "Compliance Statement", content: "HealthPal is fully HIPAA compliant. We have implemented technical, administrative, and physical safeguards as required by the Health Insurance Portability and Accountability Act." },
        { title: "Business Associate Agreements (BAA)", content: "We enter into BAAs with all our cloud providers and partners who may have access to Protected Health Information (PHI)." },
        { title: "Audit & Logging", content: "Every access event to health data is logged, audited, and reviewed to ensure maximum security and accountability." }
    ];
    return <LegalPage title="HIPAA Status" lastUpdated="Dec 15, 2023" sections={sections} />;
}
