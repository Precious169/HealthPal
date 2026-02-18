'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormInput } from '@/components/auth/FormInput';
import { StepIndicator } from '@/components/auth/StepIndicator';
import { saveUser, updateHealthProfile } from '@/lib/auth';

export default function SignupPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Step 1: Account
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Step 2: Profile
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [conditions, setConditions] = useState<string[]>([]);
    const [phone, setPhone] = useState('');

    const [errors, setErrors] = useState<Record<string, string>>({});

    const steps = ['Account', 'Profile'];

    const handleNext = () => {
        setErrors({});
        const newErrors: Record<string, string> = {};

        if (currentStep === 1) {
            if (name.length < 2) newErrors.name = 'Name must be at least 2 characters';
            if (!email.includes('@')) newErrors.email = 'Please enter a valid email';
            if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
            if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        }

        if (currentStep === 2) {
            if (age && (parseInt(age) < 1 || parseInt(age) > 120)) {
                newErrors.age = 'Please enter a valid age';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            // Clear any existing session data first to ensure clean state
            sessionStorage.clear();

            // Save user data
            saveUser({
                name,
                email,
                onboarding: { completed: false },
                isDemo: false,
            });

            // Save health profile
            updateHealthProfile({
                age: age ? parseInt(age) : undefined,
                gender: gender || undefined,
                conditions: conditions.length > 0 ? conditions : undefined,
            });

            // Redirect to onboarding
            router.push('/onboarding');
        }, 800);
    };

    const toggleCondition = (condition: string) => {
        setConditions((prev) =>
            prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition]
        );
    };

    const commonConditions = ['Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Arthritis', 'None'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#0d2847] to-[#05b7d6] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Signup Card */}
            <div className="w-full max-w-2xl relative z-10">
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
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-white/60 mb-8">Join HealthPal and take control of your health</p>

                        {/* Step Indicator */}
                        <StepIndicator currentStep={currentStep} totalSteps={2} steps={steps} />

                        {/* Step 1: Basic Info */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <FormInput
                                    label="Full Name"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={setName}
                                    error={errors.name}
                                    icon="person"
                                    required
                                />
                                <FormInput
                                    label="Email Address"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={setEmail}
                                    error={errors.email}
                                    icon="mail"
                                    required
                                />
                                <FormInput
                                    label="Password"
                                    type="password"
                                    placeholder="At least 6 characters"
                                    value={password}
                                    onChange={setPassword}
                                    error={errors.password}
                                    icon="lock"
                                    required
                                />
                                <FormInput
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={setConfirmPassword}
                                    error={errors.confirmPassword}
                                    icon="lock"
                                    required
                                />
                            </div>
                        )}

                        {/* Step 2: Health Profile */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        label="Age"
                                        type="number"
                                        placeholder="25"
                                        value={age}
                                        onChange={setAge}
                                        error={errors.age}
                                        icon="calendar_today"
                                    />
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-white/90">Gender</label>
                                        <select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="w-full px-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all cursor-pointer appearance-none"
                                        >
                                            <option value="" className="bg-slate-900 text-white">Select</option>
                                            <option value="male" className="bg-slate-900 text-white">Male</option>
                                            <option value="female" className="bg-slate-900 text-white">Female</option>
                                            <option value="other" className="bg-slate-900 text-white">Other</option>
                                            <option value="prefer-not-to-say" className="bg-slate-900 text-white">Prefer not to say</option>
                                        </select>
                                    </div>
                                </div>

                                <FormInput
                                    label="Phone Number"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    value={phone}
                                    onChange={setPhone}
                                    icon="phone"
                                />

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-white/90">Medical Conditions</label>
                                    <p className="text-xs text-white/60 mb-3">Select all that apply</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {commonConditions.map((condition) => (
                                            <button
                                                key={condition}
                                                type="button"
                                                onClick={() => toggleCondition(condition)}
                                                className={`px-4 py-3 rounded-xl border transition-all text-sm font-semibold ${conditions.includes(condition)
                                                    ? 'bg-gradient-to-r from-cyan-400 to-blue-600 border-transparent text-white shadow-lg shadow-cyan-500/30'
                                                    : 'bg-white/10 backdrop-blur-md border-white/20 text-white/80 hover:bg-white/20'
                                                    }`}
                                            >
                                                {condition}
                                            </button>
                                        ))}
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
                                onClick={handleNext}
                                disabled={isLoading}
                                className={`${currentStep === 1 ? 'w-full' : 'flex-1'} bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined animate-spin !text-xl">progress_activity</span>
                                        Creating account...
                                    </span>
                                ) : currentStep === 2 ? (
                                    'Complete Signup'
                                ) : (
                                    'Continue'
                                )}
                            </button>
                        </div>

                        {/* Login Link */}
                        {currentStep === 1 && (
                            <p className="text-center text-white/60 mt-6">
                                Already have an account?{' '}
                                <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        )}
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1">
                        <span className="material-symbols-outlined !text-sm">arrow_back</span>
                        Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}
