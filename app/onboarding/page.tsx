'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepIndicator } from '@/components/auth/StepIndicator';
import { saveOnboardingData, getUser, logout } from '@/lib/auth';

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Step 1: Health Goals
    const [goals, setGoals] = useState<string[]>([]);

    // Step 2: Medications
    const [medications, setMedications] = useState<Array<{ name: string; dosage: string; frequency: string }>>([]);
    const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: 'daily' });

    // Step 3: Preferences
    const [reminders, setReminders] = useState(true);
    const [healthTips, setHealthTips] = useState('weekly');

    const steps = ['Health Goals', 'Medications', 'Preferences'];

    const healthGoals = [
        { id: 'weight', label: 'Weight Management', icon: 'monitor_weight' },
        { id: 'chronic', label: 'Chronic Condition Tracking', icon: 'medical_services' },
        { id: 'fitness', label: 'Fitness & Wellness', icon: 'fitness_center' },
        { id: 'mental', label: 'Mental Health', icon: 'psychology' },
        { id: 'nutrition', label: 'Nutrition Tracking', icon: 'restaurant' },
        { id: 'sleep', label: 'Sleep Quality', icon: 'bedtime' },
    ];

    const toggleGoal = (goalId: string) => {
        setGoals((prev) => (prev.includes(goalId) ? prev.filter((g) => g !== goalId) : [...prev, goalId]));
    };

    const addMedication = () => {
        if (newMed.name && newMed.dosage) {
            setMedications([...medications, newMed]);
            setNewMed({ name: '', dosage: '', frequency: 'daily' });
        }
    };

    const removeMedication = (index: number) => {
        setMedications(medications.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handleSkip = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        setIsLoading(true);

        setTimeout(() => {
            // Save onboarding data
            saveOnboardingData({
                completed: true,
                goals,
                medications,
                preferences: {
                    reminders,
                    healthTips,
                },
            });

            // Redirect to dashboard
            router.push('/dashboard');
        }, 800);
    };

    const user = getUser();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#0d2847] to-[#05b7d6] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Onboarding Card */}
            <div className="w-full max-w-3xl relative z-10">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                        <span className="material-symbols-outlined !text-3xl">health_and_safety</span>
                    </div>
                    <span className="font-heading font-bold text-3xl tracking-tight text-white">HealthPal</span>
                </div>

                {/* Glassmorphic Card */}
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Welcome, {user?.name || 'there'}! 👋
                        </h1>
                        <p className="text-white/60 mb-8">Let's personalize your health journey</p>

                        {/* Step Indicator */}
                        <StepIndicator currentStep={currentStep} totalSteps={3} steps={steps} />

                        {/* Step 1: Health Goals */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">What are your health goals?</h2>
                                    <p className="text-white/60 text-sm mb-6">Select all that apply</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {healthGoals.map((goal) => (
                                        <button
                                            key={goal.id}
                                            type="button"
                                            onClick={() => toggleGoal(goal.id)}
                                            className={`p-6 rounded-xl border transition-all text-left ${goals.includes(goal.id)
                                                ? 'bg-gradient-to-r from-cyan-400 to-blue-600 border-transparent shadow-lg shadow-cyan-500/30'
                                                : 'bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`size-12 rounded-xl flex items-center justify-center ${goals.includes(goal.id) ? 'bg-white/20' : 'bg-white/10'
                                                        }`}
                                                >
                                                    <span className="material-symbols-outlined text-white !text-2xl">{goal.icon}</span>
                                                </div>
                                                <span className="font-semibold text-white">{goal.label}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Medications */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">Current Medications</h2>
                                    <p className="text-white/60 text-sm mb-6">Add any medications you're currently taking (optional)</p>
                                </div>

                                {/* Medication List */}
                                {medications.length > 0 && (
                                    <div className="space-y-3 mb-6">
                                        {medications.map((med, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
                                            >
                                                <div>
                                                    <div className="font-semibold text-white">{med.name}</div>
                                                    <div className="text-sm text-white/60">
                                                        {med.dosage} • {med.frequency}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeMedication(index)}
                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add Medication Form */}
                                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Medication name"
                                        value={newMed.name}
                                        onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Dosage (e.g., 10mg)"
                                            value={newMed.dosage}
                                            onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                                            className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                        />
                                        <select
                                            value={newMed.frequency}
                                            onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                                            className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                                        >
                                            <option value="daily">Daily</option>
                                            <option value="twice-daily">Twice Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="as-needed">As Needed</option>
                                        </select>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addMedication}
                                        disabled={!newMed.name || !newMed.dosage}
                                        className="w-full py-3 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 font-semibold hover:bg-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        + Add Medication
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Preferences */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">Notification Preferences</h2>
                                    <p className="text-white/60 text-sm mb-6">Customize how we keep you informed</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                                        <label className="flex items-start gap-4 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={reminders}
                                                onChange={(e) => setReminders(e.target.checked)}
                                                className="mt-1 w-5 h-5 rounded border-white/20 bg-white/10 text-cyan-400 focus:ring-cyan-400/20"
                                            />
                                            <div className="flex-1">
                                                <div className="font-semibold text-white mb-1">Medication & Appointment Reminders</div>
                                                <div className="text-sm text-white/60">
                                                    Get timely notifications for your medications and upcoming appointments
                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                                        <label className="block mb-3 font-semibold text-white">Health Tips Frequency</label>
                                        <div className="space-y-2">
                                            {['daily', 'weekly', 'monthly', 'never'].map((freq) => (
                                                <label key={freq} className="flex items-center gap-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="healthTips"
                                                        value={freq}
                                                        checked={healthTips === freq}
                                                        onChange={(e) => setHealthTips(e.target.value)}
                                                        className="w-4 h-4 text-cyan-400 focus:ring-cyan-400/20"
                                                    />
                                                    <span className="text-white/80 capitalize">{freq}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex gap-4 mt-8">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex-1 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold hover:bg-white/20 transition-all"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={handleSkip}
                                className="flex-1 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white/80 font-semibold hover:bg-white/20 transition-all"
                            >
                                Skip
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={isLoading}
                                className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined animate-spin !text-xl">progress_activity</span>
                                        Completing...
                                    </span>
                                ) : currentStep === 3 ? (
                                    'Complete Setup'
                                ) : (
                                    'Continue'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
