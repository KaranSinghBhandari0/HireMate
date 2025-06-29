/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Outfit", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.8s ease-out both",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: 0, transform: "translateY(30px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
}