interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    steps: string[];
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
            {/* Progress Bar */}
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm mb-6">
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
            </div>

            {/* Step Labels */}
            <div className="flex justify-between items-center">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;

                    return (
                        <div key={step} className="flex flex-col items-center flex-1">
                            <div
                                className={`size-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all ${isCompleted
                                        ? 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                                        : isActive
                                            ? 'bg-white/20 backdrop-blur-md border-2 border-cyan-400 text-cyan-400'
                                            : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white/40'
                                    }`}
                            >
                                {isCompleted ? (
                                    <span className="material-symbols-outlined !text-lg">check</span>
                                ) : (
                                    stepNumber
                                )}
                            </div>
                            <span
                                className={`text-xs font-semibold text-center ${isActive ? 'text-cyan-400' : isCompleted ? 'text-white/80' : 'text-white/40'
                                    }`}
                            >
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
