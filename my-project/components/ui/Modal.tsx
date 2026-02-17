'use client';

import { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, children, title, size = 'md' }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className={`relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}>
                <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-2xl p-6 md:p-8">
                    {/* Header */}
                    {title && (
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">{title}</h2>
                            <button
                                onClick={onClose}
                                className="text-white/60 hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined !text-2xl">close</span>
                            </button>
                        </div>
                    )}

                    {/* Content */}
                    <div className="text-white">{children}</div>
                </div>
            </div>
        </div>
    );
}
