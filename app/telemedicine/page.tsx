'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import AppHeader from '@/components/AppHeader';
import { PageHeader } from '@/components/ui/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Modal } from '@/components/ui/Modal';
import { getUser } from '@/lib/auth';
import { getAppointments, saveAppointment, type Appointment } from '@/lib/healthData';

const doctors = [
    {
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        photo: '/doctor-1.jpg',
        rating: 4.9,
        experience: '15 years',
        availability: ['Mon', 'Wed', 'Fri'],
        bio: 'Specialized in preventive cardiology and heart disease management.',
    },
    {
        name: 'Dr. Michael Chen',
        specialty: 'General Practice',
        photo: '/doctor-2.jpg',
        rating: 4.8,
        experience: '12 years',
        availability: ['Tue', 'Thu', 'Sat'],
        bio: 'Comprehensive primary care for patients of all ages.',
    },
    {
        name: 'Dr. Emily Rodriguez',
        specialty: 'Dermatology',
        photo: '/doctor-3.jpg',
        rating: 5.0,
        experience: '10 years',
        availability: ['Mon', 'Tue', 'Wed'],
        bio: 'Expert in skin conditions, cosmetic procedures, and skin cancer screening.',
    },
    {
        name: 'Dr. James Williams',
        specialty: 'Orthopedics',
        photo: '/doctor-4.jpg',
        rating: 4.7,
        experience: '18 years',
        availability: ['Wed', 'Thu', 'Fri'],
        bio: 'Specializing in sports medicine and joint replacement.',
    },
];

const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM',
];

export default function TelemedicinePage() {
    const router = useRouter();
    const [user, setUser] = useState(getUser());
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [notes, setNotes] = useState('');
    const [isBooking, setIsBooking] = useState(false);
    const [filter, setFilter] = useState('all');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        setAppointments(getAppointments());
    }, [user, router]);

    const handleBookAppointment = () => {
        if (!selectedDoctor || !selectedDate || !selectedTime) return;

        setIsBooking(true);
        setTimeout(() => {
            saveAppointment({
                doctorName: selectedDoctor.name,
                doctorPhoto: selectedDoctor.photo,
                specialty: selectedDoctor.specialty,
                date: selectedDate,
                time: selectedTime,
                status: 'upcoming',
                notes,
            });
            setAppointments(getAppointments());
            setSelectedDoctor(null);
            setSelectedDate('');
            setSelectedTime('');
            setNotes('');
            setIsBooking(false);
        }, 1000);
    };

    const filteredDoctors = filter === 'all' ? doctors : doctors.filter(d => d.specialty === filter);
    const upcomingAppointments = appointments.filter(a => a.status === 'upcoming');
    const pastAppointments = appointments.filter(a => a.status === 'completed');

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
                            title="Telemedicine"
                            subtitle="Connect with top-tier specialists from the comfort of your home"
                            breadcrumbs={[
                                { label: 'Dashboard', href: '/dashboard' },
                                { label: 'Telemedicine', href: '/telemedicine' },
                            ]}
                        />

                        {/* Upcoming Appointments */}
                        {upcomingAppointments.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-white mb-4">Upcoming Appointments</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {upcomingAppointments.map((apt) => (
                                        <GlassCard key={apt.id} className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="size-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white">
                                                    <span className="material-symbols-outlined !text-3xl">videocam</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-white text-lg">{apt.doctorName}</h3>
                                                    <p className="text-white/60 text-sm">{apt.specialty}</p>
                                                    <div className="flex items-center gap-3 mt-2 text-sm text-cyan-400">
                                                        <span className="material-symbols-outlined !text-sm">calendar_today</span>
                                                        {apt.date} • {apt.time}
                                                    </div>
                                                </div>
                                                <button className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
                                                    Join Call
                                                </button>
                                            </div>
                                        </GlassCard>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Filter */}
                        <div className="mb-6">
                            <div className="flex gap-3 flex-wrap">
                                {['all', 'Cardiology', 'General Practice', 'Dermatology', 'Orthopedics'].map((spec) => (
                                    <button
                                        key={spec}
                                        onClick={() => setFilter(spec)}
                                        className={`px-4 py-2 rounded-xl font-semibold transition-all ${filter === spec
                                            ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                                            : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'
                                            }`}
                                    >
                                        {spec === 'all' ? 'All Specialties' : spec}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Doctors Grid */}
                        <h2 className="text-2xl font-bold text-white mb-4">Available Doctors</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {filteredDoctors.map((doctor) => (
                                <GlassCard key={doctor.name} className="p-6" hover>
                                    <div className="flex flex-col items-center text-center">
                                        <div className="size-24 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4">
                                            <span className="material-symbols-outlined text-cyan-400 !text-5xl">person</span>
                                        </div>
                                        <h3 className="font-bold text-white text-lg mb-1">{doctor.name}</h3>
                                        <p className="text-cyan-400 text-sm mb-2">{doctor.specialty}</p>
                                        <div className="flex items-center gap-1 mb-3">
                                            <span className="material-symbols-outlined text-yellow-400 !text-sm">star</span>
                                            <span className="text-white font-semibold">{doctor.rating}</span>
                                            <span className="text-white/60 text-sm">• {doctor.experience}</span>
                                        </div>
                                        <p className="text-white/70 text-sm mb-4">{doctor.bio}</p>
                                        <div className="flex gap-2 mb-4">
                                            {doctor.availability.map((day) => (
                                                <span key={day} className="px-2 py-1 bg-white/10 rounded text-xs text-white">
                                                    {day}
                                                </span>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => setSelectedDoctor(doctor)}
                                            className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                                        >
                                            Book Appointment
                                        </button>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>

                        {/* Past Appointments */}
                        {pastAppointments.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Past Consultations</h2>
                                <GlassCard className="p-6">
                                    <div className="space-y-4">
                                        {pastAppointments.map((apt) => (
                                            <div key={apt.id} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                                                <div>
                                                    <h4 className="font-semibold text-white">{apt.doctorName}</h4>
                                                    <p className="text-white/60 text-sm">{apt.specialty} • {apt.date}</p>
                                                </div>
                                                <span className="text-emerald-400 text-sm font-semibold">Completed</span>
                                            </div>
                                        ))}
                                    </div>
                                </GlassCard>
                            </div>
                        )}
                    </div>

                    {/* Booking Modal */}
                    <Modal
                        isOpen={!!selectedDoctor}
                        onClose={() => setSelectedDoctor(null)}
                        title={`Book Appointment with ${selectedDoctor?.name}`}
                        size="md"
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-white/90 mb-2">Select Date</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white/90 mb-2">Select Time</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {timeSlots.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-2 rounded-lg font-semibold transition-all ${selectedTime === time
                                                ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white'
                                                : 'bg-white/10 text-white hover:bg-white/20'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white/90 mb-2">Notes (Optional)</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Describe your symptoms or reason for visit..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                />
                            </div>

                            <button
                                onClick={handleBookAppointment}
                                disabled={!selectedDate || !selectedTime || isBooking}
                                className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isBooking ? 'Booking...' : 'Confirm Appointment'}
                            </button>
                        </div>
                    </Modal>
                </main>
            </div>
        </div>
    );
}
