interface FormInputProps {
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    icon?: string;
    required?: boolean;
}

export function FormInput({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    icon,
    required = false,
}: FormInputProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/90">
                {label} {required && <span className="text-cyan-400">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 !text-xl">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border ${error ? 'border-red-400/50' : 'border-white/20'
                        } text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
                    required={required}
                />
            </div>
            {error && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                    <span className="material-symbols-outlined !text-base">error</span>
                    {error}
                </p>
            )}
        </div>
    );
}
