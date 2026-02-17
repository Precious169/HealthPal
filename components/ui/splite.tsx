'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface ErrorBoundaryProps {
    children: ReactNode
    fallback: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

class SplineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Spline Runtime Error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback
        }

        return this.props.children
    }
}

interface SplineSceneProps {
    scene: string
    className?: string
    fallbackImage?: string
}

export function SplineScene({ scene, className, fallbackImage }: SplineSceneProps) {
    const defaultFallback = (
        <div className={`w-full h-full flex items-center justify-center bg-slate-900/50 rounded-3xl overflow-hidden ${className}`}>
            {fallbackImage ? (
                <img src={fallbackImage} alt="Fallback" className="w-full h-full object-cover opacity-40 grayscale" />
            ) : (
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            )}
        </div>
    )

    return (
        <SplineErrorBoundary fallback={defaultFallback}>
            <Suspense fallback={defaultFallback}>
                <Spline
                    scene={scene}
                    className={className}
                />
            </Suspense>
        </SplineErrorBoundary>
    )
}
