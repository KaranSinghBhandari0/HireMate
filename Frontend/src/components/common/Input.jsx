import { cn } from "../../utils/helper";
import { AlertCircle } from "lucide-react";

export default function Input({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder = "",
    required = false,
    error = "",
    icon = null,
    className = "",
    inputClassName = "",
    autoFocus = false,
    ...props
}) {
    return (
        <div className={cn("w-full", className)}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    autoFocus={autoFocus}
                    className={cn(
                        "w-full border border-gray-300 text-sm rounded-md focus:outline-none focus:border-2 transition px-3 py-2 text-gray-700",
                        icon ? "pl-10" : "",
                        error
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-green-500",
                        inputClassName
                    )}
                    {...props}
                />
            </div>

            {error && (
                <p className="flex items-center text-sm mt-1 text-red-600">
                    <AlertCircle size={14} className="mr-1" />
                    {error}
                </p>
            )}
        </div>
    );
}
