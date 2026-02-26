'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { Card } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/GlassCard";
import { Modal } from "@/components/ui/Modal";
import { SplineScene } from "@/components/ui/splite";
import { saveContactSubmission, initializeSampleData } from "@/lib/healthData";

export default function Home() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [salesForm, setSalesForm] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Session-based app logic
  }, []);

  const handleSalesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!salesForm.name || !salesForm.email || !salesForm.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      saveContactSubmission({
        name: salesForm.name,
        email: salesForm.email,
        subject: `Sales Inquiry from ${salesForm.company || 'N/A'}`,
        message: salesForm.message,
        type: 'sales',
      });
      setIsSubmitting(false);
      setShowSalesModal(false);
      setSalesForm({ name: '', email: '', company: '', message: '' });
      alert('Thank you! Our sales team will contact you shortly.');
    }, 1000);
  };

  return (
    <div className="font-display bg-[#0a192f] text-white antialiased min-h-screen selection:bg-cyan-500/30">
      {/* Sticky Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0a192f]/60 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined !text-2xl">health_and_safety</span>
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">HealthPal</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-white/70 hover:text-cyan-400 transition-colors">Features</a>
            <Link href="/doctors" className="text-sm font-semibold text-white/70 hover:text-cyan-400 transition-colors">Our Doctors</Link>
            <Link href="/about" className="text-sm font-semibold text-white/70 hover:text-cyan-400 transition-colors">About</Link>
            <Link href="/help" className="text-sm font-semibold text-white/70 hover:text-cyan-400 transition-colors">Help Center</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-bold text-white/70 hover:text-white transition-colors">Log In</Link>
            <Link href="/signup" className="hidden xs:block bg-gradient-to-r from-cyan-400 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95">
              Get Started
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined !text-3xl">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 w-full bg-[#0a192f] border-b border-white/10 p-6 space-y-4 animate-in slide-in-from-top duration-300">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-lg font-semibold text-white/70">Features</a>
            <Link href="/doctors" onClick={() => setIsMenuOpen(false)} className="block text-lg font-semibold text-white/70">Our Doctors</Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block text-lg font-semibold text-white/70">About</Link>
            <Link href="/help" onClick={() => setIsMenuOpen(false)} className="block text-lg font-semibold text-white/70">Help Center</Link>
            <div className="pt-4 flex flex-col gap-4">
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-center font-bold text-white/70">Log In</Link>
              <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-3 rounded-xl font-bold text-center">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#05b7d6" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">AI-Powered Personalized Health</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold font-heading mb-8 leading-[1.1]">
                Your Health, <br /><span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Simplified.</span>
              </h1>

              <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl">
                The all-in-one platform for telemedicine, secure health records, and smart medication management. Professional clinical care at your fingertips.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link href="/signup" className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white text-[#0a192f] font-black text-lg hover:scale-105 transition-transform shadow-2xl shadow-cyan-500/10 text-center">
                  Start Your Profile
                </Link>
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                >
                  <span className="material-symbols-outlined !text-2xl">play_circle</span>
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center animate-in fade-in zoom-in duration-1000 delay-300 order-first lg:order-last">
              <div className="relative w-full h-full max-w-2xl flex items-center justify-center">
                {/* Secondary Strand - Reverse Rotation */}
                <img
                  src="/dna-2.png"
                  className="absolute w-[90%] h-[90%] object-contain animate-spin-slow-reverse opacity-40 mix-blend-screen scale-110 blur-[2px]"
                  alt="DNA Atmosphere"
                />
                {/* Primary Strand - Forward Rotation */}
                <img
                  src="/dna-1.png"
                  className="absolute w-full h-full object-contain animate-spin-slow drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                  alt="DNA Helix"
                />
                {/* Interactive Glowing Orbitals */}
                <div className="absolute inset-0 animate-orbit pointer-events-none">
                  <div className="w-12 h-12 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <div className="absolute inset-0 animate-orbit pointer-events-none" style={{ animationDelay: '-10s', animationDuration: '30s' }}>
                  <div className="w-8 h-8 ml-auto bg-blue-500/20 rounded-full blur-lg animate-pulse"></div>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a192f] to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Persona Display */}
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            <PersonaCard
              image="/persona-professional.png"
              role="Busy Professional"
              benefit="Time-saving virtual care"
              color="cyan"
            />
            <PersonaCard
              image="/persona-senior.png"
              role="Independent Senior"
              benefit="Easy medication tracking"
              color="blue"
            />
            <PersonaCard
              image="/persona-caregiver.png"
              role="Active Caregiver"
              benefit="Centralized family records"
              color="purple"
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">Everything You Need To <span className="text-cyan-400">Thrive</span></h2>
            <p className="text-white/60 text-lg max-w-xl">Deep integration into your daily health routine with tools designed for simplicity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon="clinical_notes"
              title="Med Records"
              desc="Securely store and share clinical notes, imaging, and reports."
              link="/records"
              color="bg-blue-500"
            />
            <FeatureCard
              icon="precision_manufacturing"
              title="Drug Tracking"
              desc="Intelligent reminders and dosage history for your medications."
              link="/medication"
              color="bg-emerald-500"
            />
            <FeatureCard
              icon="science"
              title="Lab Results"
              desc="Analyze your test results with interactive charts and data."
              link="/lab-results"
              color="bg-purple-500"
            />
            <FeatureCard
              icon="videocam"
              title="Telemedicine"
              desc="Instant video consultations with certified specialists."
              link="/telemedicine"
              color="bg-orange-500"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <GlassCard className="p-12 md:p-24 text-center relative overflow-hidden border-white/20 ring-1 ring-white/10 shadow-[0_0_50px_rgba(6,182,212,0.15)] group">
            {/* Kinetic Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
              {/* Scanning Laser Line */}
              <div className="absolute inset-0 opacity-30">
                <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent shadow-[0_0_40px_rgba(34,211,238,0.2)] animate-medical-scan !bg-[length:100%_10%] bg-no-repeat"></div>
              </div>

              {/* Floating Medical Cards */}
              <div className="absolute top-[5%] left-[2%] md:top-[10%] md:left-[10%] animate-float opacity-40 md:opacity-80 z-[-1] transition-all duration-700 group-hover:scale-110" style={{ animationDelay: '0s' }}>
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-2 md:p-3 rounded-2xl rotate-[-5deg] shadow-lg shadow-cyan-500/10">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-cyan-400 !text-[10px] md:!text-sm">monitoring</span>
                    <span className="text-[8px] md:text-[10px] font-bold tracking-tight text-white/70 uppercase">Vitals Sync</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[8%] left-[2%] md:bottom-[15%] md:left-[15%] animate-float opacity-40 md:opacity-80 z-[-1] transition-all duration-700 group-hover:scale-110" style={{ animationDelay: '4s' }}>
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-2 md:p-3 rounded-2xl rotate-[3deg] shadow-lg shadow-emerald-500/10">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400 !text-[10px] md:!text-sm">verified_user</span>
                    <span className="text-[8px] md:text-[10px] font-bold tracking-tight text-white/70 uppercase">Secure Hsync</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-[10%] right-[2%] md:top-[15%] md:right-[15%] animate-float opacity-40 md:opacity-80 z-[-1] transition-all duration-700 group-hover:scale-110" style={{ animationDelay: '2s' }}>
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-2 md:p-3 rounded-2xl rotate-[5deg] shadow-lg shadow-purple-500/10">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-400 !text-[10px] md:!text-sm">biotech</span>
                    <span className="text-[8px] md:text-[10px] font-bold tracking-tight text-white/70 uppercase">Lab Analysis</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[12%] right-[2%] md:bottom-[20%] md:right-[20%] animate-float opacity-40 md:opacity-80 z-[-1] transition-all duration-700 group-hover:scale-110" style={{ animationDelay: '1s' }}>
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-2 md:p-3 rounded-2xl rotate-[-2deg] shadow-lg shadow-blue-500/10">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-400 !text-[10px] md:!text-sm">settings_input_antenna</span>
                    <span className="text-[8px] md:text-[10px] font-bold tracking-tight text-white/70 uppercase">Protocol V3.2</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f]/80 via-transparent to-[#0a192f]/80 pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-bold mb-8">Ready to Take Control?</h2>
              <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                Join 50,000+ users who have transformed how they manage their health. HIPAA-compliant and secure.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/signup" className="px-12 py-5 rounded-2xl bg-cyan-500 text-white font-black text-xl hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 active:scale-95 text-center">
                  Join Now - It&apos;s Free
                </Link>
                <Link
                  href="/sales"
                  className="px-12 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md font-bold text-xl hover:bg-white/10 transition-all active:scale-95 text-center"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 px-6 bg-[#0a192f]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-cyan-500 p-1.5 rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined !text-xl">health_and_safety</span>
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">HealthPal</span>
            </Link>
            <p className="text-white/40 max-w-xs mb-8">
              Making healthcare accessible, secure, and intelligent for everyone through technology.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon="public" />
              <SocialIcon icon="forum" />
              <SocialIcon icon="groups" />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="/doctors" className="hover:text-cyan-400 transition-colors">Our Doctors</Link></li>
              <li><Link href="/careers" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li><Link href="/help" className="hover:text-cyan-400 transition-colors">Help Center</Link></li>
              <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/hipaa" className="hover:text-cyan-400 transition-colors">HIPAA Status</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-16 pt-8 text-center text-white/20 text-xs">
          © 2024 HealthPal Inc. Built with love for a healthier world.
        </div>
      </footer>

      {/* Modals */}
      <Modal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        title="HealthPal Demo"
        size="lg"
      >
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 group relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined !text-6xl text-cyan-400 mb-4 animate-pulse">play_circle</span>
              <p className="text-white/60 font-medium">Watch the platform in action</p>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-cyan-400 rounded-full"></div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassCard className="p-4 border-white/10">
            <h4 className="font-bold flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-cyan-400 !text-lg">verified_user</span>
              Secure Identity
            </h4>
            <p className="text-xs text-white/50 leading-relaxed">Multi-factor biometric auth for your health records.</p>
          </GlassCard>
          <GlassCard className="p-4 border-white/10">
            <h4 className="font-bold flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-purple-400 !text-lg">insights</span>
              Smart Analysis
            </h4>
            <p className="text-xs text-white/50 leading-relaxed">AI that catches trends and patterns in your lab data.</p>
          </GlassCard>
        </div>
      </Modal>
    </div>
  );
}

function PersonaCard({ image, role, benefit, color }: { image: string, role: string, benefit: string, color: string }) {
  const colorMap: any = {
    cyan: "border-cyan-500/20",
    blue: "border-blue-500/20",
    purple: "border-purple-500/20"
  };

  return (
    <div className={`group relative h-80 rounded-3xl overflow-hidden border ${colorMap[color]} bg-white/5 backdrop-blur-xl transition-all hover:-translate-y-2`}>
      <img src={image} className="absolute inset-0 w-full h-full object-cover transition-all duration-700" alt={role} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/20 to-transparent"></div>
      <div className="absolute bottom-8 left-8 right-8">
        <h3 className="text-2xl font-bold mb-2">{role}</h3>
        <p className="text-white/60 text-sm font-medium">{benefit}</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, link, color }: { icon: string, title: string, desc: string, link: string, color: string }) {
  return (
    <GlassCard className="p-8 group hover:bg-white/10 transition-all border-white/5">
      <div className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
        <span className="material-symbols-outlined text-white !text-3xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-white/50 text-sm mb-8 leading-relaxed">{desc}</p>
      <Link href={link} className="flex items-center gap-2 text-sm font-bold text-cyan-400 group-hover:gap-3 transition-all">
        Learn More
        <span className="material-symbols-outlined !text-sm">arrow_forward</span>
      </Link>
    </GlassCard>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  return (
    <Link href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:border-cyan-400 transition-all">
      <span className="material-symbols-outlined !text-xl text-white/70 group-hover:text-white">{icon}</span>
    </Link>
  );
}