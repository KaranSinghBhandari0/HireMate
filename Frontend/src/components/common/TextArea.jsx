import { AlertCircle } from "lucide-react";
import { cn } from "../../utils/helper";

export default function Textarea({
    label,
    name,
    value,
    onChange,
    placeholder = "",
    required = false,
    rows = 4,
    error = "",
    className = "",
    textareaClassName = "",
    ...props
}) {
    return (
        <div className={cn("w-full", className)}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                required={required}
                className={cn(
                    "w-full border border-gray-300 text-sm rounded-md focus:outline-none focus:border-2 transition px-3 py-2 text-gray-700",
                    error ? "border-red-500 focus:border-red-500" : "focus:border-green-500",
                    textareaClassName
                )}
                {...props}
            />
            {error && (
                <p className="flex items-center text-sm mt-1 text-red-600">
                    <AlertCircle size={14} className="mr-1" />
                    {error}
                </p>
            )}
        </div>
    );
}
