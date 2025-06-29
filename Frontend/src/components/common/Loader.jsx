export default function Loader({ text = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
            <div className="flex items-end space-x-1">
                <div className="w-2 h-4 bg-green-500 animate-[ping_0.9s_ease-in-out_infinite]"></div>
                <div className="w-2 h-6 bg-green-500 animate-[ping_0.9s_ease-in-out_infinite] [animation-delay:0.1s]"></div>
                <div className="w-2 h-8 bg-green-500 animate-[ping_0.9s_ease-in-out_infinite] [animation-delay:0.2s]"></div>
                <div className="w-2 h-6 bg-green-500 animate-[ping_0.9s_ease-in-out_infinite] [animation-delay:0.3s]"></div>
                <div className="w-2 h-4 bg-green-500 animate-[ping_0.9s_ease-in-out_infinite] [animation-delay:0.4s]"></div>
            </div>
            <p className="text-muted-foreground">{text}</p>
        </div>
    );
}
