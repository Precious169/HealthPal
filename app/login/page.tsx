'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormInput } from '@/components/auth/FormInput';
import { saveUser, validateLogin } from '@/lib/auth';
import { initializeSampleData } from '@/lib/healthData';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPasswordSent, setForgotPasswordSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Validation
        const newErrors: { username?: string; password?: string } = {};
        if (username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }
        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (validateLogin(username, password)) {
                // Clear any existing session data first to ensure clean state
                sessionStorage.clear();

                // Initialize sample data for demo experience
                initializeSampleData(true);

                saveUser({
                    email: `${username}@example.com`, // dummy email since we use username
                    name: username,
                    onboarding: { completed: true }, // Assume returning users completed onboarding
                    isDemo: true,
                });

                // Redirect to dashboard
                router.push('/dashboard');
            } else {
                setErrors({ password: 'Invalid credentials' });
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#0d2847] to-[#05b7d6] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                        <span className="material-symbols-outlined !text-3xl">health_and_safety</span>
                    </div>
                    <span className="font-heading font-bold text-3xl tracking-tight text-white">HealthPal</span>
                </div>

                {/* Glassmorphic Card */}
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-white/60 mb-8">Sign in to access your health dashboard</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormInput
                                label="Username"
                                type="text"
                                placeholder="e.g. johndoe"
                                value={username}
                                onChange={setUsername}
                                error={errors.username}
                                icon="person"
                                required
                            />

                            <div className="space-y-1">
                                <FormInput
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={setPassword}
                                    error={errors.password}
                                    icon="lock"
                                    required
                                />
                                <div className="flex flex-col items-end relative">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setForgotPasswordSent(true);
                                            setTimeout(() => setForgotPasswordSent(false), 3000);
                                        }}
                                        className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors text-sm"
                                    >
                                        Forgot password?
                                    </button>
                                    {forgotPasswordSent && (
                                        <div className="absolute top-full mt-2 right-0 bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded border border-emerald-500/20 whitespace-nowrap animate-in fade-in slide-in-from-top-1 z-10">
                                            Password reset link sent!
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined animate-spin !text-xl">progress_activity</span>
                                        Signing in...
                                    </span>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-transparent text-white/60">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <button className="flex items-center justify-center py-4 px-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all">
                                <img src="/google-logo.png" alt="Google" className="w-6 h-6" />
                            </button>
                            <button className="flex items-center justify-center py-4 px-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all">
                                <img src="/apple-logo.png" alt="Apple" className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <p className="text-center text-white/60">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
                                Sign up
                            </Link>
                        </p>
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
