import { Plus, Minus, AlertCircle } from "lucide-react";
import { cn } from "../../utils/helper";

export default function MultiInput({
    label,
    name,
    values = [],
    onChange,
    onAdd,
    onRemove,
    placeholder = "",
    required = false,
    error = "",
    className = "",
    inputClassName = "",
}) {
    return (
        <div className={cn("w-full", className)}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            {values.map((value, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                        type="text"
                        name={`${name}[${index}]`}
                        value={value}
                        onChange={(e) => onChange(e, index)}
                        placeholder={`${placeholder} ${index + 1}`}
                        required={required}
                        className={cn(
                            "w-full border border-gray-300 text-sm rounded-md focus:outline-none focus:border-2 px-3 py-2 text-gray-700",
                            error
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-300 focus:border-green-500",
                            inputClassName
                        )}
                    />
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="text-red-600 hover:text-red-700"
                        title="Remove"
                    >
                        <Minus size={18} />
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={onAdd}
                className="flex items-center gap-1 text-sm text-green-600 hover:underline"
            >
                <Plus size={16} /> Add more
            </button>

            {error && (
                <p className="flex items-center text-sm mt-1 text-red-600">
                    <AlertCircle size={14} className="mr-1" />
                    {error}
                </p>
            )}
        </div>
    );
}
