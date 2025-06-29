import { Loader2 } from "lucide-react";
import { cn } from "../../utils/helper";

export default function Button({
    type = "button",
    disabled = false,
    loading = false,
    onClick,
    children,
    className = "",
    loaderText = "Loading...",
    icon = null,
    ...props
}) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={cn(
                `w-full py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center bg-green-500 text-white hover:bg-green-600 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed`,
                className
            )}
            {...props}
        >
            {loading ? (
                <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    {loaderText}
                </>
            ) : (
                <>
                    {icon && <span className="mr-2">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
}