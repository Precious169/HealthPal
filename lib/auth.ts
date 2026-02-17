// Session storage utilities for mock authentication

export interface HealthProfile {
    age?: number;
    gender?: string;
    conditions?: string[];
}

export interface OnboardingData {
    completed: boolean;
    goals?: string[];
    medications?: Array<{ name: string; dosage: string; frequency: string }>;
    preferences?: {
        reminders: boolean;
        healthTips: string;
    };
}

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    healthProfile?: HealthProfile;
    onboarding?: OnboardingData;
    createdAt: string;
}

const USER_KEY = 'healthpal_user';
const ONBOARDING_KEY = 'healthpal_onboarding';

// Save user to session storage
export function saveUser(userData: Partial<User>): void {
    if (typeof window === 'undefined') return;

    const existingUser = getUser();
    const user: User = {
        id: existingUser?.id || generateId(),
        email: userData.email || existingUser?.email || '',
        name: userData.name || existingUser?.name || '',
        avatar: userData.avatar || existingUser?.avatar,
        healthProfile: userData.healthProfile || existingUser?.healthProfile,
        onboarding: userData.onboarding || existingUser?.onboarding || { completed: false },
        createdAt: existingUser?.createdAt || new Date().toISOString(),
    };

    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Get current user from session storage
export function getUser(): User | null {
    if (typeof window === 'undefined') return null;

    const userStr = sessionStorage.getItem(USER_KEY);
    if (!userStr) return null;

    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
    return getUser() !== null;
}

// Logout - clear session
export function logout(): void {
    if (typeof window === 'undefined') return;

    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(ONBOARDING_KEY);
}

// Save onboarding data
export function saveOnboardingData(data: Partial<OnboardingData>): void {
    if (typeof window === 'undefined') return;

    const user = getUser();
    if (!user) return;

    const updatedOnboarding: OnboardingData = {
        ...user.onboarding,
        ...data,
        completed: data.completed ?? user.onboarding?.completed ?? false,
    };

    saveUser({ ...user, onboarding: updatedOnboarding });
}

// Update health profile
export function updateHealthProfile(profile: Partial<HealthProfile>): void {
    const user = getUser();
    if (!user) return;

    saveUser({
        ...user,
        healthProfile: {
            ...user.healthProfile,
            ...profile,
        },
    });
}

// Generate a simple ID
function generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Mock login validation
export function validateLogin(email: string, password: string): boolean {
    // For demo purposes, accept any email/password combination
    // In production, this would call an API
    return email.includes('@') && password.length >= 6;
}

// Mock signup validation
export function validateSignup(email: string, password: string, name: string): boolean {
    return email.includes('@') && password.length >= 6 && name.length >= 2;
}
