/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        container: {
            screens: {
                DEFAULT: "550px",
                sm: "640px",
                lg: "768px",
                xl: "1078px",
                "2xl": "1350px",
            },
        },
    },
    plugins: [],
};
