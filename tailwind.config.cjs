/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{svelte,js,ts}"],
    darkMode: "dark",
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
};
